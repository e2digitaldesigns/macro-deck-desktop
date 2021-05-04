import React, { useEffect, useState } from "react";
import { useGlobalData } from "../../../hooks";
import _cloneDeep from "lodash/cloneDeep";
import * as yup from "yup";
import { toast } from "react-toastify";

export interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
  const globalData = useGlobalData();
  const [portState, setPortState] = useState({ port: "" });

  const portSchema = yup.object().shape({
    port: yup.string().required().min(4).max(4).label("Port Number")
  });

  useEffect(() => {
    setPortState(portState => ({
      ...portState,
      port: globalData?.state?.settings?.port
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[\d]+$/;
    const value = e.target.value;

    if ((regex.test(value) && value.length <= 4) || value === "") {
      setPortState({ ...portState, port: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const validation = await portSchema.validate({
        ...portState
      });

      if (!validation) return;
      const state = _cloneDeep(globalData.state);
      state.settings.port = portState.port;
      globalData.setState(state);
    } catch (err) {
      toast.warning(err.errors[0]);
    }
  };

  const showServerLink = !!globalData.state.settings.port;
  const serverLink = `http://${globalData.state.settings.ipAddress}:${globalData.state.settings.port}`;

  return (
    <div className="setting-wrapper">
      <h1>Settings</h1>
      <ul>
        <li>General</li>
        <li>Notifications</li>
        <li>Captures</li>
        <li>Captures</li>
        <li>Xbox One</li>
        <li>Network</li>
      </ul>

      <main className="setting-switch-container">
        <fieldset>
          <h3>Server Settings</h3>
          <div>
            <label htmlFor="settings_general__ipAddress">IP Address:</label>
            <span>{globalData.state.settings.ipAddress}</span>
          </div>

          <div>
            <label htmlFor="settings_general__port">Port:</label>
            <input
              data-testid="settings_general__port"
              name="settings_general__port"
              onChange={e => handleOnChange(e)}
              type="text"
              value={portState.port}
            />
          </div>
          {showServerLink && (
            <div>
              <span />
              <span>{serverLink}</span>
            </div>
          )}

          <div>
            <span />
            <span>
              You will need to restart this application after changing the Port
              Number.
            </span>
          </div>

          <div>
            <span />
            <span>
              <button className="settings-submit-button" onClick={handleSubmit}>
                Submit
              </button>
            </span>
          </div>
        </fieldset>

        {/* <fieldset>
          <h3>Social Media Accounts</h3>
          <div>Link Twitter Account</div>
        </fieldset> */}
      </main>
    </div>
  );
};

export default Settings;
