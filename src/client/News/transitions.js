const initPreviewStyle = {
  boxShadow: `0 0 0 0px rgb(232, 232, 232)`,
  transition: `box-shadow 1000ms cubic-bezier(0.390, 0.575, 0.565, 1.000), color 1400ms`,
  borderRadius: `18px`,
  color: `white`,
  transform: `translate(0, -150px)`,
  width: `100%`,
  position: `relative`,
  backgroundColor: `white`,
  zIndex: `2`
};

const previewTransitions = {
  entered: {
    boxShadow: `0 2px 60px 5px #CEDEFF`,
    color: `#006bb6`
  }
};

const initMetaStyle = {
  opacity: `0`,
  textShadow: `0px 0px 1px #F2F2F2`,
  transform: `translate(0, 200px)`,
  transition: `opacity 800ms cubic-bezier(0.755, 0.050, 0.855, 0.060), transform 600ms`,
  width: `100%`,
  fontSize: `20px`,
  marginBottom: `200px`
};

const metaTransitions = {
  entered: {
    opacity: 1,
    textShadow: `2px 14px 8px #d0d0d0`,
    transform: `translate(0, 0)`
  }
};

const initImgStyle = {
  width: `100%`,
  borderRadius: `18px`,
  height: `210px`,
  marginTop: `40px`,
  objectFit: `cover`,
  opacity: 0,
  transform: `translate(0, -200px)`,
  transition: `opacity 800ms cubic-bezier(0.215, 0.610, 0.355, 1.000), transform 1000ms cubic-bezier(0.215, 0.610, 0.355, 1.000)`,
  transitionDelay: `200ms`,
  position: `relative`,
  zIndex: `1`
};

const imgTransitions = {
  entered: {
    transform: `translate(0, -130px)`,
    opacity: 1,
    boxShadow: `0 -8px 60px 2px #9C9C9C`
  }
};

const labelTransitions = {
  entering: { transform: `translateY(-4em)`, opacity: 0 },
  entered: {
    opacity: 1,
    transform: `translateY(.5em)`,
    transition: `transform 600ms, opacity 1800ms cubic-bezier(0.215, 0.610, 0.355, 1.000)`
  },
  exited: { opacity: 0 }
};

module.exports = {
  initPreviewStyle,
  previewTransitions,
  initMetaStyle,
  metaTransitions,
  initImgStyle,
  imgTransitions,
  labelTransitions
}
