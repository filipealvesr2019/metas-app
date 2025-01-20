import React from 'react';

const ImageSettings = ({ settings, setSettings, handleProfileImageChange, error }) => {
  return (
    <div className="settings-section">
      <h3 className="subtitle is-5 mb-4" style={{ color: "#000" }}>Imagens</h3>

      <div className="field">
        <label className="label">Imagem de Perfil (URL)</label>
        <div className="control">
          <input
            type="url"
            className="input"
            value={settings.profileImage}
            onChange={(e) => handleProfileImageChange(e.target.value)}
            placeholder="https://exemplo.com/sua-imagem.jpg"
          />
        </div>
        {error && <p className="help is-danger">{error}</p>}
      </div>

      <div className="field">
        <label className="label">Imagem de Fundo (URL)</label>
        <div className="control">
          <input
            type="url"
            className="input"
            value={settings.backgroundImage}
            onChange={(e) => setSettings(prev => ({...prev, backgroundImage: e.target.value}))}
            placeholder="https://exemplo.com/background.jpg"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Overlay de Fundo</label>
        <div className="control">
          <div className="select is-fullwidth">
            <select
              value={settings.backgroundOverlay}
              onChange={(e) => setSettings(prev => ({...prev, backgroundOverlay: e.target.value}))}
            >
              <option value="none">Sem overlay</option>
              <option value="light">Claro</option>
              <option value="dark">Escuro</option>
              <option value="blur">Desfoque</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSettings; 