/**
 * Camera Scenegraph Component
 * @param {object} opt
 */
module.exports = (payload) => {
    let child = payload.child;
    let parent = payload.parent;
    let data = payload.data;
    const redrawAddMethod = payload.addToRedraw;
    const addToUpdated = payload.addToUpdated;
    let sceneprops = payload.sceneprops;

    var d = data || {};

    const surface = Module.getSurface();
    const scene = surface.getScene();
    const { mat4, vec3, vec4 } = Module.require('assets/gl-matrix.js');

    // loading flag
    let isLoading = true;

    let media = null;

    let renderList = [];

    let updateHandlers = new Map();

    // deprecated
    const insert = (array, value) => {}
    const remove = (array, value) => {}
    const addToBucket = (category, type, value, enabled, key) => {};
    const insertIntoBucket = (category, type, value, enabled, key) => {}
    const toggleLink = (category, type, link, enabled)=>{}
    const regenerateLink = (category, type, link) => {}
    // deprecated

    const getLastItemInMap = map => Array.from(map)[map.size-1]
    const getLastKeyInMap = map => Array.from(map)[map.size-1][0]
    const getLastValueInMap = map => Array.from(map)[map.size-1][1];

    let transformation = {
        distance: (d['distance'] !== undefined) ? d.distance : 2,
        position: (d['position'] !== undefined) ? [...d.position] : [0, 1, 2],
        target: (d['target'] !== undefined) ? [...d.target] : [0, 0, 0],
        visible: (d['visible'] !== undefined) ? d['visible'] : true,
        groupMat: (d['groupMat']) || mat4.create(),
    };

    // console.log(JSON.stringify(transformation))

    //
    let finalPosition = transformation.position;
    let finalVisibility = transformation.visible;
    let parentOpts = {};

    let object = {
        parent,
        item: {
            type: child.type,
            key: child.key,
            title: child.title,
        },
        transformation: {},
        children: new Map(),
        links: new Map(),
    }

    let links = {};


    const getTransformationValues = () => {
        const transformArray = ["position", "distance", "target"];

        const vals = {};

        for (const x in transformArray) {
            const opt = transformArray[x];
            const idx = object.transformation[opt].bucket[object.transformation[opt].bucket.length - 1];
            const v = object.transformation[opt].index[idx].value;
            vals[opt] = v;
        }

        return vals;
    }

    const render = (opts) => {
        opts = opts || {};
        // loop renderlist and draw out
        let renderTransformation = false;
        let renderVisibility = false;

        for (var i in renderList) {
            const row = renderList[i];
            switch (row.type) {
                case "position":
                case "distance":
                case "target":
                    if (!renderTransformation){
                        transformation.position = [...getLastValueInMap(getProperties('position'))];
                        transformation.target = [...getLastValueInMap(getProperties('target'))];
                        transformation.distance = getLastValueInMap(getProperties('distance'));
                        renderTransformation = true;
                    }
                    break;
                case "visible":
                    finalVisibility = getLastValueInMap(getProperties('visible'));
                    renderVisibility = true;
                    break;
            }
        }

        if (renderTransformation || opts.transform) {

        }

        if (renderVisibility || opts.visible != undefined) {
            // opts
            const prevVisible = parentOpts.visible;
            if (opts.visible !== undefined) {
                parentOpts.visible = opts.visible && finalVisibility;
            } else if (object.parent && object.parent.parentOpts.visible !== undefined) {
                parentOpts.visible = object.parent.parentOpts.visible && finalVisibility;
            }else{
                parentOpts.visible = finalVisibility;
            }

            Module.ProjectManager.isDirty = true;
            renderVisibility = true;
        }

        renderList = [];
        isLoading = false;
    }

    Object.assign(object, {
        render
    })

    const addToRedraw = (type, value) => {
        renderList.push({ type, value });
        redrawAddMethod(child.key, object);
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


    // links['visible'] = addToBucket(object.transformation, "visible", transformation.visible);
    // links['distance'] = addToBucket(object.transformation, "distance", transformation.distance);
    // links['position'] = addToBucket(object.transformation, "position", transformation.position);
    // links['target'] = addToBucket(object.transformation, "target", transformation.target);
    // links['groupMat'] = addToBucket(object.transformation, "groupMat", transformation.groupMat);

    // addToRedraw("visible");
    // addToRedraw("transform");
    // addToRedraw("color");

    // added
    addToUpdated(object.item.key, 'added', {prop:'item', value: object.item})

    setProperty("visible", transformation.visible);
    setProperty("distance", transformation.distance);
    setProperty("position", transformation.position);
    setProperty("target", transformation.target);
    setProperty("groupMat", transformation.groupMat);


    if (object.parent) object.parent.children.set(child.key, object);

    //     position: (d['position'] !== undefined) ? [...d.position] : [1, 1, 1],
     //     visible: (d['visible'] !== undefined) ? d['visible'] : true,
    //     distance: (d['distance'] !== undefined) ? d.distance : 2,
    //     target: (d['target'] !== undefined) ? [...d.target] : [1, 1, 1],
    //     groupMat: (d['groupMat']) || mat4.create(),

    // Props and Methods
    Object.defineProperties(object, {
        visible: { get: () => { return getProperty('visible')[1]; }, set: (v) => { setProperty('visible', v); } },
        position: { get: () => { return getProperty('position')[1]; }, set: (v) => { setProperty('position', v); } },
        distance: { get: () => { return getProperty('distance')[1]; }, set: (v) => { setProperty('distance', v); } },
        target: { get: () => { return getProperty('target')[1]; }, set: (v) => { setProperty('target', v); } },
        groupMat: { get: () => { return getProperty('groupMat')[1]; }, set: (v) => { setProperty('groupMat', v); } },

        finalPosition: { get: () => { return finalPosition; }, set: (v) => { } },
        finalVisibility: { get: () => { return finalVisibility; }, set: (v) => { } },
        parentOpts: { get: () => { return parentOpts; }, set: (v) => { } },
        //   visible: { get: () => { createLoadingBar(); return visible; }, set: (v) => { visible = v; createLoadingBar(); loadingBar.visible = v } },
    })

    Object.assign(object, {
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

        addChangeListener: (callback)=>{
            updateHandlers.set(callback, callback);
        },

        removeChangeListener: (callback)=>{
            updateHandlers.delete(callback)
        },

        clearChangeHandlers: ()=> {
            updateHandlers.clear();
        },

        remove: ()=> {
            for (let [key, child] of object.children) {
                child.remove();
            }

            for (let [key, handler] of updateHandlers) {
                handler("removed");
            }

            sceneprops.sceneIndex.delete(object.item.key);
            if (object.parent) object.parent.children.delete(object.item.key);

            Module.ProjectManager.isDirty = true;
        },
    })

    return object;
}
