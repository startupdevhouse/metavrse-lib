/**
 * Generic Object Scenegraph Component
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

    let renderList = [];

    const insert = (array, value) => {
        var low = 0,
            high = array.length;
        while (low < high) {
            var mid = low + high >>> 1;
            if (array[mid] < value) low = mid + 1;
            else high = mid;
        }
        array = array.splice(low, 0, value);
        return low;
    }

    const remove = (array, value) => {
        var index = array.indexOf(value);
        if (index >= 0) {
            array.splice(index, 1);
        }
    }

    let transformation = {
        visible: (d['visible'] !== undefined) ? d['visible'] : true,
    };

    //
    let finalVisibility = transformation.visible;
    let parentOpts = {};
    
    let links = {};

    let object = {
        parent,
        item: {
            type: child.type,
            key: child.key,
            title: child.title,
        },
        transformation: {},
        children: new Map(),
    }

    const render = (opts) => {
        opts = opts || {};
        // loop renderlist and draw out
        let renderVisibility = false;        

        for (var i in renderList) {
            const row = renderList[i];
            switch (row.type) {
                case "visible":
                    const idx = object.transformation["visible"].bucket[object.transformation["visible"].bucket.length - 1];
                    const v = object.transformation["visible"].index[idx].value;
                    finalVisibility = v;
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
    }

    Object.assign(object, {
        render
    })

    const addToRedraw = (type, value) => {
        renderList.push({ type, value });
        redrawAddMethod(child.key, object);
    }

    const addToBucket = (category, type, value, enabled, key) => {
        if (category[type] === undefined) category[type] = {
            index: [],
            bucket: [],
        };

        let link = {
            key,
            value: value,
            enabled: enabled == undefined || enabled,
            index: category[type].index.length
        }
        category[type].index.push(link);

        if (enabled == undefined || enabled) insert(category[type].bucket, link.index);

        return link;
    };

    const insertIntoBucket = (category, type, value, enabled, key) => {
        category[type].bucket.splice(1);
        let bucket = category[type].index.splice(1);

        const insertConfiguration = (array, value) => {
            var low = 0,
                high = array.length;
            while (low < high) {
                var mid = low + high >>> 1;
                var currentValue = sceneprops.configurations.get(array[mid].key).index;
                var newValue = sceneprops.configurations.get(value).index;
                if (currentValue < newValue) low = mid + 1;
                else high = mid;
            }
            array = array.splice(low, 0, value);
            return low;
        }
        
        insertConfiguration(bucket, key);

        var newlink;
        for (let x=0; x < bucket.length; x++){
            let link = bucket[x];
            if (link == key){
                newlink = addToBucket(category, type, value, enabled, key);
            } else {
                // return link update index
                link.index = category[type].index.length;
                category[type].index.push(link);
                if (link.enabled) insert(category[type].bucket, link.index);
            }
        }
        
        return newlink;
    }

    const toggleLink = (category, type, link, enabled)=>{
     
        if (category[type] === undefined) return;

        link.enabled = enabled == undefined || enabled;

        var changed = false;
        if (category[type].bucket.includes(link.index) && !enabled) {
            // if removing active item
            changed = category[type].bucket[category[type].bucket.length-1] == link.index;
            remove(category[type].bucket, link.index);
        }else if (!category[type].bucket.includes(link.index) && enabled) {
            insert(category[type].bucket, link.index);
            // if inserting into active position 
            changed = category[type].bucket[category[type].bucket.length-1] == link.index;
        }else{
            changed = category[type].bucket[category[type].bucket.length-1] == link.index;
        }

        return changed;
    }

    const removeLink = (category, type, link) => {
        if (category[type] === undefined) return false;

        let changed = false;

        if (category[type].bucket.includes(link.index)) {
            changed = category[type].bucket[category[type].bucket.length - 1] == link.index;

            remove(category[type].bucket, link.index);
            delete category[type].index[link.index];
            let idx = 0;
            category[type].index = category[type].index.filter(
                (val) => {
                    const newIdx = idx++;
                    category[type].bucket[category[type].bucket.indexOf(val.index)] = newIdx;
                    val.index = newIdx;
                    return val;
                });            
        }


        return changed;
    }

    const regenerateLink = (category, type, link) => {
        if (category[type] === undefined) return false;

        let isCurrentValue = category[type].bucket[category[type].bucket.length - 1] == link.index;

        category[type].bucket.splice(1);
        let bucket = category[type].index.splice(1);

        const insertConfiguration = (array, value) => {
            var low = 0,
                high = array.length;
            while (low < high) {
                var mid = low + high >>> 1;
                var currentValue = sceneprops.configurations.get(array[mid].key).index;
                var newValue = sceneprops.configurations.get(value.key).index;
                if (currentValue < newValue) low = mid + 1;
                else high = mid;
            }
            array = array.splice(low, 0, value);
            return low;
        }

        let newBucket = [];
        for (let x=0; x < bucket.length; x++){
            insertConfiguration(newBucket, bucket[x]);
        }

        for (let x=0; x < newBucket.length; x++){
            let link = newBucket[x];
            link.index = category[type].index.length;
            category[type].index.push(link);
            if (link.enabled) insert(category[type].bucket, link.index);
        }

        let isNewValue = category[type].bucket[category[type].bucket.length - 1] == link.index;

        return isNewValue || (isCurrentValue && !isNewValue);
    }

    links["visible"] = addToBucket(object.transformation, "visible", transformation.visible);
    addToRedraw("visible");

    if (object.parent) object.parent.children.set(child.key, object);

    const getProperty = (prop)=>{
        return (links[prop]) ? links[prop].value : undefined;
    }

    const setProperty = (prop, v, redraw) => {
        if (links[prop]) {
            const value = links[prop].value;
            const type = (value == null || Object.prototype.toString.call(value) === "[object String]") ? "string" : typeof value;

            var valsChanged = (type == "object") ? !(value[0] == v[0] && value[1] == v[1] && value[2] == v[2]) : value != v;
            if (valsChanged) {
                links[prop].value = (type == "object") ? [...v] : v;
                const changed = toggleLink(object.transformation, prop, links[prop], true); // always send true
                if (changed) addToRedraw(redraw);
            }
        }
    }

    // Props and Methods
    Object.defineProperties(object, {
        visible: { get: () => { return getProperty('visible'); },  set: (v) => { setProperty('visible', v, "visible");} },
        parentOpts: { get: () => { return parentOpts; }, set: (v) => {  } },
        //   visible: { get: () => { createLoadingBar(); return visible; }, set: (v) => { visible = v; createLoadingBar(); loadingBar.visible = v } },
    })

    Object.assign(object, {
        addToBucket,
        insertIntoBucket,
        regenerateLink,
        toggleLink,
        addToRedraw,
        
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

        },
    })

    return object;
}