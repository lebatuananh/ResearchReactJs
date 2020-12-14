const gridHelper = {
  def: {
    pageSize: 50,
    pageSizes: [50, 100, 200],
    dblClick: (e, callback) => {
      var attrRole = e.cellElement.getAttribute('role');
      if (attrRole && attrRole === 'gridcell') {
        callback();
      }
    },
  },
};

export default gridHelper;
