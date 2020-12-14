const selectHelper = {
  def: {
    filterOption: (input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
  },
};

export default selectHelper;
