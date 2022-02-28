/**
 * Object Scenegraph Component
 * @param {object} opt 
 */
module.exports = (payload) => {
    let child = payload.child;
    let parent = payload.parent;
    let data = payload.data;
    const redrawAddMethod = payload.addToRedraw;
    let sceneprops = payload.sceneprops;

    var d = data || {};

    const surface = Module.getSurface();
    const scene = surface.getScene();
    const { mat4, vec3 } = Module.require('assets/gl-matrix.js');

    const addToUpdated = payload.addToUpdated;

    // loading flag
    let isLoading = true;

    let renderList = [];

    // removing
    const insert = (array, value) => {}
    const remove = (array, value) => {}
    const addToBucket = (prop, value, key) => {};
    const insertIntoBucket = (category, type, value, enabled, key) => {}
    const toggleLink = (prop, key)=>{}
    const regenerateLink = (category, type, link) => {}
    // removing

    const getLastItemInMap = map => Array.from(map)[map.size-1]
    const getLastKeyInMap = map => Array.from(map)[map.size-1][0]
    const getLastValueInMap = map => Array.from(map)[map.size-1][1];

    let transformation = {
        visible: (d['visible'] !== undefined) ? d['visible'] : true,
    };

    let liveData = JSON.parse(JSON.stringify(transformation));

    //
    let finalVisibility = liveData.visible;
    let parentOpts = {};
    
    let object = {
        parent,
        item: {
            type: child.type,
            key: child.key,
            title: child.title,
        },
        links : new Map(),
        transformation: {},
        children: new Map(),
    }

    const getProperty = (prop, key)=>{
        if (!object.links.has(prop)) return [undefined,undefined];

        let buckets = object.links.get(prop);

        if (key != undefined && buckets.has(key)) return [key, buckets.get(key)];
        else if (key != undefined) return [undefined,undefined];
        else return [object.item.key, buckets.get(object.item.key)];
    }

    const getProperties = (prop)=>{
        if (!object.links.has(prop)) return undefined;
        return object.links.get(prop);
    }

    const setProperty = (prop, value, key) => {
        if (key == undefined) {
            transformation[prop] = value;
            key = object.item.key;

            addToUpdated(key, (isLoading) ? 'loaded' : 'changed', {prop,value})
        }
        
        let buckets = (object.links.has(prop)) ? object.links.get(prop): new Map();

        let lastKey = (buckets.size > 0) ? getLastKeyInMap(buckets) : key;

        buckets.set(key, value);
        
        // key is at the end of the chain already
        if (key == lastKey){
            
        }else if (key != object.item.key){
            // only move links to the end

            let bucket = buckets.get(key);
            buckets.delete(key);

            // reinsert at end
            buckets.set(key, bucket);

            if (lastKey != object.item.key) addToUpdated(lastKey, 'changed', {prop: prop + "_enabled",value : false})

        }

        object.links.set(prop, buckets);

        addToRedraw(prop);
    }

    const removeLink = (prop, key) => {
        if (key == undefined || !object.links.has(prop)) return false;

        let buckets = object.links.get(prop);
        
        if (buckets.delete(key)) {
            addToRedraw(prop);
            return true;
        }

        return false;
    }

    const render = (opts) => {
        opts = opts || {};
        // loop renderlist and draw out
        let renderVisibility = false;        

        for (var i in renderList) {
            const row = renderList[i];
            switch (row.type) {
                case "visible":
                    finalVisibility = getLastValueInMap(getProperties(row.type));
                    renderVisibility = true;                    
                    break;
            }
        }

        if (renderVisibility || opts.visible != undefined) {
            // opts
            if (opts.visible !== undefined) {
                parentOpts.visible = opts.visible && finalVisibility;
            }else if (object.parent && object.parent.parentOpts.visible !== undefined) {
                parentOpts.visible = object.parent.parentOpts.visible && finalVisibility;
            }else{
                parentOpts.visible = finalVisibility;
            }
            renderVisibility = true;                    
        }

        // render children
        if (renderVisibility){
            for (let [key, value] of object.children) {
                value.render(parentOpts);
            }
        }

        renderList = [];
        isLoading = false;

    }

    const addToRedraw = (type, value) => {
        renderList.push({ type, value });
        redrawAddMethod(child.key, object);
    }

    // added
    addToUpdated(object.item.key, 'added', {prop:'item', value: object.item})

    setProperty("visible", liveData.visible);

    if (object.parent) object.parent.children.set(child.key, object);

    // Props and Methods
    Object.defineProperties(object, {
        visible: { get: () => { return getProperty('visible')[1]; },  set: (v) => { setProperty('visible', v);} },
        parentOpts: { get: () => { return parentOpts; }, set: (v) => {  } },
        //   visible: { get: () => { createLoadingBar(); return visible; }, set: (v) => { visible = v; createLoadingBar(); loadingBar.visible = v } },
    })

    Object.assign(object, {
        render,
        
        addToBucket,
        insertIntoBucket,
        regenerateLink,
        toggleLink,

        addToRedraw,
        
        setProperty,
        getProperty,
        getProperties,
        removeLink,

        clearRender: ()=> {
            renderList = [];
        },

        remove: ()=> {
            for (let [key, child] of object.children) {
                child.remove();
            }
            
            sceneprops.sceneIndex.delete(object.item.key);
            if (object.parent) object.parent.children.delete(object.item.key);

            addToUpdated(object.item.key, 'removed', {prop:'item', value:object.item})

        },
    })

    return object;
}