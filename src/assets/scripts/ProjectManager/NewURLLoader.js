/**
 * URL Loader Helper component
 * Will download and extract project package
 * @param {object} opt
 */
module.exports = (opt) => {
  opt = opt || {};

  const surface = Module.getSurface();
  const scene = surface.getScene();

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const newLoader = {};
  let fullpath = '/';

  // Somewhere inside this file we need to put the new endpoint
  const fetchData = async (url, password, options, callback) => {
    const lsKey = `${url}_lastTimeDownloaded`;
    const headers = {};
    const lastTimeDownloaded = localStorage.getItem(lsKey);

    if (password) {
      headers.Authorization = `Basic ${btoa(`user:${password}`)}`;
    }

    if (lastTimeDownloaded) {
      headers['If-Modified-Since'] = lastTimeDownloaded;
    }

    fetch(url, { headers })
      .then(async (res) => {
        if (res.status === 200) {
          if (!res.body || !res.headers) {
            options.onProjectFileInvalid && options.onProjectFileInvalid();
            return;
          }
          options.onProjectLoadingStart && options.onProjectLoadingStart();
          localStorage.setItem(lsKey, res.headers.get('Last-Modified'));

          const reader = res.body.getReader();
          const contentLength = res.headers.get('Content-Length') ?? 0;
          let loaded = 0;

          const consume = async () => {
            return new Response(
              new ReadableStream({
                start(controller) {
                  read();
                  function read() {
                    reader
                      .read()
                      .then(({ done, value }) => {
                        if (done) {
                          if (contentLength === 0) {
                            options.onDownloadProgress &&
                              options.onDownloadProgress({
                                total: contentLength,
                                loaded: loaded,
                              });
                          }

                          controller.close();
                          return;
                        }

                        loaded += value.byteLength;
                        options.onDownloadProgress &&
                          options.onDownloadProgress({
                            total: contentLength,
                            loaded: loaded,
                          });
                        controller.enqueue(value);
                        read();
                      })
                      .catch((error) => {
                        console.error(error);
                        controller.error(error);
                      });
                  }
                },
              })
            );
          };

          const buff = await consume();

          callback(await buff.arrayBuffer());
        }

        if (res.status === 404) {
          options.onProjectNotFound && options.onProjectNotFound();
        }

        if (res.status === 401) {
          options.onIncorrectPassword && options.onIncorrectPassword(password);
        }

        if (res.status === 403) {
          options.onLimitsExceeded && options.onLimitsExceeded();
        }
      })
      .catch(() => {
        options.onProjectFileInvalid && options.onProjectFileInvalid();
      });
  };

  // Temporary name, you can change it
  const tempMethodName = async (url, password, options, cb) => {
    fetchData(url, password, options, async (data) => {
      if (!data) throw Error('No data found!');

      let idb;
      if (Module.canvas) idb = Module.require('assets/idb.js')();
      data.type = '';
      let localdb = await idb.openDB('workspace', 21, {
        upgrade(db) {
          db.createObjectStore('FILE_DATA');
        },
      });

      // Store zip file in indexedDB
      let tx = localdb.transaction('FILE_DATA', 'readwrite');
      await tx.store.delete(IDBKeyRange.bound(fullpath, fullpath + '\uffff'));
      await tx.store.put(
        new Blob([new Uint8Array(data)]),
        fullpath + 'project.zip'
      );
      await tx.done;
      localdb.close();
      localdb = null;
      tx = null;

      await sleep(400);

      if (Module.FS) {
        Module.FS.writeFile(fullpath + 'project.zip', new Uint8Array(data));
      } else {
        surface.writeFile(fullpath + 'project.zip', data);
      }

      await sleep(100);

      const archive = Module.ProjectManager.archive;
      archive.close();
      archive.open(fullpath + 'project.zip');
      scene.setFSZip(archive);

      const readJsonFile = (filename) => {
        return JSON.parse(archive.fopens(filename));
      };

      // Read json files form zip
      const project = readJsonFile('project.json');
      const assets = readJsonFile('assets.json');

      const { startingScene } = project;
      const tree = readJsonFile(`scenes/${startingScene}/tree.json`);
      const entities = readJsonFile(`scenes/${startingScene}/entities.json`);
      const world = readJsonFile(`scenes/${startingScene}/world.json`);

      // Create project data for json files in zip
      const projectData = {
        data: {
          version: project.version,
          title: project.title,
          scene: {
            [project.startingScene]: {
              tree: [...tree],
              data: {
                world,
                ...entities,
              },
            },
          },
          starting_scene: project.startingScene,
          assets: {
            tree: [...assets],
            data: {},
          },
          selected_scene: project.selectedScene,
        },
      };

      options.onProjectLoaded && options.onProjectLoaded();
      cb(projectData);
    });
  };

  return Object.assign(newLoader, {
    tempMethodName,
  });
};
