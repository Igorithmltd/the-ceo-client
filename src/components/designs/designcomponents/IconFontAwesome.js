import React from 'react'
//import PropTypes from 'prop-types'
//import * from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CirclePictureContainer(props) {
  return (
    <FontAwesomeIcon icon={props.name} className={props.IconStyle} />
  )
}

//CirclePictureContainer.propTypes = {}

export default CirclePictureContainer
