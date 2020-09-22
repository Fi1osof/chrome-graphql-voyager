import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Menu extends PureComponent {

  render() {

    const {
      endpoint,
      onChange,
      error,
      disabled,
      loading,
      ...other
    } = this.props;

    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 100,
        }}
      >
        <input placeholder="Адрес API" value={endpoint || ""} onChange={onChange} {...other} />

        {error && !loading ? <div style={{
          color: "red",
        }}>Ошибка загрузки схемы</div> : null}
      </div>
    );
  }
}

Menu.propTypes = {

  // Адрес API
  endpoint: PropTypes.string.isRequired,

  // Функция для смены адреса
  onChange: PropTypes.func.isRequired,

  error: PropTypes.bool.isRequired,

  disabled: PropTypes.bool.isRequired,

  loading: PropTypes.bool.isRequired,
};

export default Menu;