import OBSWebSocket from "obs-websocket-js";

export interface IntUseObsHook {
  getScenes: () => any;
  getSources: () => any;
}

const useObsHook = () => {
  const obs = new OBSWebSocket();

  function collectItems(scenes: any) {
    const allItems: any = [];

    for (let i = 0; i < scenes.length; i++) {
      const sceneName = scenes[i].name;
      const theSources = scenes[i].sources;

      for (let x = 0; x < theSources.length; x++) {
        allItems.push({ sceneName, item: theSources[x].name });

        if (theSources[x].type === "group") {
          for (let y = 0; y < theSources[x].groupChildren.length; y++) {
            allItems.push({
              sceneName,
              item: theSources[x].groupChildren[y].name
            });
          }
        }
      }
    }

    return allItems;
  }

  const connection = async () => {
    await obs
      .connect({ address: "192.168.1.87:5555", password: "" })
      .then(() => console.log("connected..."))
      .catch(err => {
        console.log(err);
      });
  };

  const getScenes = async () => {
    try {
      await connection();
      const scenes = await obs.send("GetSceneList");
      return scenes.scenes;
    } catch (error) {
      return error;
    }
  };

  const getSources = async () => {
    try {
      await connection();
      const scenes = await obs.send("GetSceneList");
      const data = collectItems(scenes.scenes);
      return data;
    } catch (error) {
      return error;
    }
  };

  return {
    getScenes,
    getSources
  };
};

export default useObsHook;
