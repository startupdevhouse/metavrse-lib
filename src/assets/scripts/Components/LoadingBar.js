/**
 * Loading Bar
 * @param {object} opt 
 */
module.exports = (opt) => {
    opt = opt || {};

    const surface = Module.getSurface();
    const scene = surface.getScene();

    const { mat4, vec3 } = Module.require('assets/gl-matrix.js');
    const Animations = Module.require("assets/Animations.js")();

    const uniq = () => {
        return Math.floor(Math.random() * Date.now())
    }

    var options = {
        anchor: opt.anchor || [0.5, 0, 0],
        position: opt.position || [0, 50, 0],
        anchorImage: opt.anchorImage || [0.5, 0.5, 0],
        positionImage: opt.positionImage || [0, 0, 0],
        pivot: opt.pivot || [0, 0, 0],
        rotate: opt.rotate || [0, 0, 0],
        scale: opt.scale || [2, .05, 1],
        percentage: (typeof opt.percentage === "number") ? opt.percentage : 0.5,
    }

    var id = String(uniq());
    var id2 = String(uniq()+10);

    let proto = {};

    var loadingBar;
    var heroshot;
    // props
    let visible = (typeof opt.visible === "boolean") ? opt.visible : true;

    // main matrix
    var m = mat4.create();
    var pixelDensity = (Module.pixelDensity != undefined) ? Module.pixelDensity : 1;

    // axis
    var axisX = vec3.fromValues(1, 0, 0);
    var axisY = vec3.fromValues(0, 1, 0);
    var axisZ = vec3.fromValues(0, 0, 1);

    const onSurfaceChanged = (rotation, width, height)=> {
        if (!heroshot) return;

        // autorotate
        let rw = width * (1 / Module.pixelDensity);
        let rh = height * (1 / Module.pixelDensity);

        let scale3 = [rw/100, rh/100, 1];

        var m = mat4.create();

        var scale = vec3.fromValues(
            scale3[0] * pixelDensity,
            scale3[1] * pixelDensity,
            scale3[2] * pixelDensity
        );

        var translate = vec3.fromValues(
            options.positionImage[0] * pixelDensity,
            options.positionImage[1] * pixelDensity,
            options.positionImage[2] * pixelDensity
        );

        mat4.translate(m, m, translate);
        mat4.scale(m, m, scale);
        mat4.rotate(m, m, options.rotate[0] * (Math.PI / 180), axisX);
        mat4.rotate(m, m, options.rotate[1] * (Math.PI / 180), axisY);
        mat4.rotate(m, m, options.rotate[2] * (Math.PI / 180), axisZ);

        heroshot.setTransformMatrix(m);

        var mM = mat4.create();
        var nw = 0.9;
        var nh = 0.9;
        if (width < height){
            nw = 0.90;
            nh = (width/height) * 0.90;
        }else {
            nh = 0.85;
            nw = (height/width) * 0.85;
        }
        
        var scaleV = vec3.fromValues(nw, nh, 1);
        var translate = vec3.fromValues( 0, 10, 0 );

        mat4.translate(mM, mM, translate);
        mat4.scale(mM, mM, scaleV);
        heroshot.setTransformMatrix(1, mM);
    }

    const initHero = ()=>{
        Module.addEventListener("onSurfaceChanged", onSurfaceChanged);

        heroshot = scene.addObject(id2, "assets/square.c3b");
        heroshot.setParameter(1, "opacity_ratio", 0);
        heroshot.setParameter(0, "opacity_ratio", 0);
        heroshot.setParameter("hud", true);
        heroshot.setParameter("hud_alignment", options.anchorImage[0], options.anchorImage[1], options.anchorImage[2]);

        onSurfaceChanged(0, Module.screen.width, Module.screen.height);
    }

    let init = () => {
        initHero();

        loadingBar = scene.addObject(id, "assets/square.c3b");

        var scale = vec3.fromValues(
            options.scale[0] * pixelDensity,
            options.scale[1] * pixelDensity,
            options.scale[2] * pixelDensity
        );

        var translate = vec3.fromValues(
            options.position[0] * pixelDensity,
            options.position[1] * pixelDensity,
            options.position[2] * pixelDensity
        );

        mat4.translate(m, m, translate);
        mat4.scale(m, m, scale);
        mat4.rotate(m, m, options.rotate[0] * (Math.PI / 180), axisX);
        mat4.rotate(m, m, options.rotate[1] * (Math.PI / 180), axisY);
        mat4.rotate(m, m, options.rotate[2] * (Math.PI / 180), axisZ);

        loadingBar.setTransformMatrix(m);

        // main transform
        loadingBar.setParameter("hud", true);
        loadingBar.setParameter("hud_alignment", options.anchor[0], options.anchor[1], options.anchor[2]);

        // mesh transform
        // pixel density not required on mesh transforms
        var mM = mat4.create();
        var pivV = mat4.create();
        var miV = mat4.create();      // used for pivot point

        var translateV = vec3.fromValues(-100, 0, 0);
        var mScale = [options.percentage, 1, 1];
        var scaleV = vec3.fromValues(mScale[0], mScale[1], mScale[2]);
        mat4.translate(mM, mM, translateV);
        mat4.scale(mM, mM, scaleV);


        var pivV = mat4.create();
        mat4.translate(pivV, pivV, vec3.fromValues(-100, options.pivot[1], options.pivot[2]));
        mat4.invert(miV, pivV);  // used for pivot point
        mat4.multiply(mM, mM, miV);     // used for pivot point

        loadingBar.setTransformMatrix(1, mM);
        loadingBar.setParameter(0, "ambient_ratio", 43 / 255, 43 / 255, 43 / 255);
        loadingBar.setParameter(1, "ambient_ratio", 1, 1, 1);
        loadingBar.setParameter("visible", visible);

        if (Module.ProjectManager) Module.ProjectManager.isDirty = true;
    }

    // init
    init();

    Object.defineProperties(proto, {
        visible: {
            get: () => { return visible; },
            set: (v) => {
                if (!scene.getObject(id)) {
                    loadingBar = undefined;
                    return;
                }

                visible = v;
                loadingBar.setParameter("visible", visible);
                                
                if (Module.ProjectManager) Module.ProjectManager.isDirty = true;
            }
        },
        percentage: {
            get: () => { return options.percentage; },
            set: (v) => {
                if (!scene.getObject(id)) {
                    loadingBar = undefined;
                    return;
                }

                options.percentage = v;

                var mM = mat4.create();
                var mScale = [options.percentage, 1, 1];
                var scaleV = vec3.fromValues(mScale[0], mScale[1], mScale[2]);
                var translateV = vec3.fromValues(-100, 0, 0);
                mat4.translate(mM, mM, translateV);
                mat4.scale(mM, mM, scaleV);

                var pivV = mat4.create();
                var miV = mat4.create();      // used for pivot point
                mat4.translate(pivV, pivV, vec3.fromValues(-100, options.pivot[1], options.pivot[2]));
                mat4.invert(miV, pivV);  // used for pivot point
                mat4.multiply(mM, mM, miV);     // used for pivot point

                loadingBar.setTransformMatrix(1, mM);

                if (Module.ProjectManager) Module.ProjectManager.isDirty = true;
            }
        },
    })

    return Object.assign(proto, {
        isNull: ()=> {
         return scene.getObject(id) === undefined;
        },
        remove: ()=> {
            scene.removeObject(id);
            scene.removeObject(id2);
            heroshot = null;
            if (Module.ProjectManager) Module.ProjectManager.isDirty = true;
            Module.removeEventListener("onSurfaceChanged", onSurfaceChanged);

            return true;
        },
        setHeroShot: (imgbuffer)=>{
            if (imgbuffer){
                if (Module.canvas){
                    Module.FS.writeFile("assets/hero.png", new Uint8Array(imgbuffer));
                }else{
                    surface.writeFile("assets/hero.png", imgbuffer);
                }
                heroshot.setParameter(1, "ambient_texture", "assets/hero.png");
                heroshot.setParameter(1, "opacity_texture_a", "assets/hero.png");
            }else{
                heroshot.setParameter(1, "ambient_texture", "assets/poweredby.png");
                heroshot.setParameter(1, "opacity_texture_a", "assets/poweredby.png");
            }

            let cam = Animations.create({
                duration: 350, // ms
                loop: 0,    // 0 plays once, -1 always loop
                timing: Animations.timing.linear,
                
                onDraw: (perc) => { // 0 -1
                    if (heroshot) heroshot.setParameter(1, "opacity_ratio", perc);
                    Module.ProjectManager.isDirty = true;
                },
                
                onComplete: () => {
                },
            });
    
            cam.play();

        },

        toggleHeroShot: (bool)=>{
            // heroshot.setParameter("visible", bool);
            // Module.ProjectManager.isDirty = true;
        }
    })
}