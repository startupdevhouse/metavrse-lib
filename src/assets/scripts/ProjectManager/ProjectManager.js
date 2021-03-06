/**
 * Project Manager Module
 */
module.exports = () => {
  const { mat4, vec3 } = Module.require('assets/gl-matrix.js');
  const URLLoader = Module.require('assets/ProjectManager/URLLoader.js')({
    visible: true,
    percentage: 0,
  });
  const NewURLLoader = Module.require(
    'assets/ProjectManager/NewURLLoader.js'
  )();
  const Scenegraph = Module.require('assets/ProjectManager/Scenegraph.js')();

  let manager = {}; // holds manager props and methods

  // props
  let isPlaying = false;
  let isDirty = true;
  let payload = undefined;
  let projectRunning = false;

  const surface = Module.getSurface();
  const scene = surface.getScene();

  // project archive
  let archive = new Module.zip();

  const reset = () => {
    try {
      isPlaying = false;
      // redraw = {};
      isDirty = true;
      // payload = undefined;
      projectRunning = false;

      Module['fps'] = {
        maxFps: 30,
        currentFps: 30,
        startTime: null,
        frame: -1,
      };

      Module.screen.hudscale = 1;

      let dpr =
        typeof devicePixelRatio !== 'undefined' && devicePixelRatio
          ? devicePixelRatio
          : 1;
      Module['pixelDensity'] = 1 + (dpr - 1) * 0.5;

      Object.keys(Module.animationids).forEach((key) => {
        try {
          cancelAnimationFrame(key);
        } catch (error) {}
      });
      Module.animationids = {};

      for (let [key, media] of Module.videoids) {
        try {
          if (media.destroy !== undefined) media.destroy();
        } catch (error) {}
      }
      Module.videoids.clear();

      try {
        Module.clearAllSockets();
      } catch (error) {}

      try {
        Scenegraph.reset();
      } catch (error) {}

      scene.clear();
      scene.enableShadows(false);
      scene.showRulerGrid(false);
      scene.setGridAnchor(0, 0, 0);
      scene.setGridExtent(1, 1, 1);

      Module.resetCamera();

      URLLoader.visible = false;

      if (archive !== null) archive.close();
      scene.setFSZip(); // pass nothing, will reset archive pointer

      Module.clearEventListeners();

      isDirty = true;
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadURL = (url, password) => {
    reset();
    console.log('> loading url: ' + url);

    var logger = url.match(new RegExp('[?&]logger=([^&]+).*$'));
    scene.setLoggerLevel(logger === null ? '<none>' : logger[1]);

    if (Module['canvas']) {
      var console_on = url.match(new RegExp('[?&]console=([^&]+).*$'));
      var console_el = document.getElementById('logger');
      if (console_el)
        console_el.style.display =
          console_on === null || console_on[1] != 'on' ? 'none' : 'block';
    }

    URLLoader.visible = true;
    URLLoader.getPackage(
      url,
      (event) => {
        if (event) {
          // Load Project
          Scenegraph.path = event.fullpath;
          loadScene({ data: event.project }, true);
        } else {
          console.log('> error loading url: ' + url);
        }
      },
      password
    );
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const loadNewURL = async (url, password, options = {}) => {
    await NewURLLoader.tempMethodName(url, password, options, (projectData) => {
      // Change assets path so the new structure is readable in CherryGL
      Scenegraph.path = 'files/';
      loadScene(projectData, true);
    });
  };

  const loadScene = function (project, launch) {
    Scenegraph.generate(Scenegraph.path, project);

    if (launch) {
      projectRunning = true;
      Scenegraph.setLaunch(launch);
    }
  };

  const loadFromFolder = function (path) {
    reset();
    path += path.endsWith('/') ? '' : '/';
    Scenegraph.path = path;

    loadScene(
      { data: JSON.parse(surface.readFile(path + 'project.json')) },
      true
    );
  };

  const loadFromArchive = function (path) {
    reset();
    Scenegraph.path = path;

    const archive = Module.ProjectManager.archive;
    archive.open(path);
    scene.setFSZip(archive);

    loadScene({ data: JSON.parse(archive.fopens('project.json')) }, true);
  };

  // Deprecating
  const computedStyles = {
    tokens: {},
    styles: {},
    model: {},
  };

  Object.defineProperties(manager, {
    path: {
      get: () => {
        return Scenegraph.path;
      },
      set: (v) => {
        Scenegraph.path = v;
      },
    },
    project: {
      get: () => {
        return Scenegraph.project;
      },
      set: (v) => {
        Scenegraph.project = v;
      },
    },
    objects: {
      get: () => {
        return Scenegraph.objects;
      },
      set: (v) => {
        Scenegraph.objects = v;
      },
    },
    isPlaying: {
      get: () => {
        return isPlaying;
      },
      set: (v) => {
        isPlaying = v;
      },
    },
    redraw: {
      get: () => {
        return Scenegraph.redraw;
      },
      set: (v) => {
        Scenegraph.redraw = v;
      },
    },
    isDirty: {
      get: () => {
        return isDirty;
      },
      set: (v) => {
        isDirty = v;
      },
    },
    payload: {
      get: () => {
        return payload;
      },
      set: (v) => {
        payload = v;
      },
    },
    objectControllers: {
      get: () => {
        return Scenegraph.objectControllers;
      },
      set: (v) => {
        Scenegraph.objectControllers = v;
      },
    },
    meshControllers: {
      get: () => {
        return Scenegraph.meshControllers;
      },
      set: (v) => {
        Scenegraph.meshControllers = v;
      },
    },
    worldController: {
      get: () => {
        return Scenegraph.worldController;
      },
      set: (v) => {
        Scenegraph.worldController = v;
      },
    },
    projectRunning: {
      get: () => {
        return projectRunning;
      },
      set: (v) => {
        projectRunning = v;
      },
    },
    objPaths: {
      get: () => {
        return Scenegraph.objPaths;
      },
      set: (v) => {
        Scenegraph.objPaths = v;
      },
    },

    computedStyles: {
      get: () => {
        return computedStyles;
      },
      set: (v) => {},
    },

    treeGenerated: {
      get: () => {
        return Scenegraph.treeGenerated;
      },
      set: (v) => {
        Scenegraph.treeGenerated = v;
      },
    },

    archive: {
      get: () => {
        return archive;
      },
      set: (v) => {
        // if (v === undefined || v === null){
        //     if (archive !== null) archive.close();
        //     archive = null;
        //     scene.setFSZip();
        // } else {
        //     archive = v;
        // }
      },
    },
  });

  return Object.assign(manager, {
    loadURL,
    loadNewURL,
    reset,
    loadScene,
    loadFromFolder,
    loadFromArchive,
    render: Scenegraph.render,
    regenerate: Scenegraph.regenerate,
    getObject: Scenegraph.getObject,
    processRedraw: Scenegraph.processRedraw,
    addObject: Scenegraph.addObject,
    removeObject: Scenegraph.removeObject,
    moveObject: Scenegraph.moveObject,
    loadPaths: Scenegraph.loadPaths,
    getAsset: Scenegraph.getAsset,
    selectScene: Scenegraph.selectScene,

    addChangeListener: Scenegraph.addChangeListener,
    removeChangeListener: Scenegraph.removeChangeListener,
    clearChangeHandlers: Scenegraph.clearChangeHandlers,

    getObjects: Scenegraph.getObjects,
  });
};
