import React from 'react';

//cellRenderer
// export default function CellActive(data) {
//   let cls = data.value ? 'fas fa-check text-success pointer' : 'fas fa-minus text-warning pointer';

//   return <i className={cls}></i>;
// }
const CellActive = (data) => {
  let cls = data.value ? 'fas fa-check text-success pointer' : 'fas fa-minus text-warning pointer';

  return <i className={cls}></i>;
};

export default CellActive;

// cellTemplate
// export default function CellActive(container, options) {
//   let cls = options.value
//     ? 'fas fa-check text-success pointer'
//     : 'fas fa-minus text-warning pointer';

//   var tmp = document.createElement('i');
//   tmp.className = cls;
//   container.appendChild(tmp);
// }

// cellComponent
// export class CellActive extends React.PureComponent {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     let cls = this.props.data.value
//       ? 'fas fa-check text-success pointer'
//       : 'fas fa-minus text-warning pointer';
//     return (
//       <i className={cls}></i>
//     );
//   }
// }

// export default CellActive;
