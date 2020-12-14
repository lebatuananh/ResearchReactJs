const formHelper = {
  def: {
    shouldComponentUpdate: (props, nextProps, nextState) => {
      if (props.model && !nextProps.model) return false;
      return true;
    },
  },
};

export default formHelper;
