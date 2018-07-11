import React from 'react';

class TitleComponent extends React.Component {

  render() {
    return(
      <nav className="flex items-center justify-between flex-wrap bg-teal p-6">
        <div className="flex items-center flex-no-shrink text-white mr-6">
          <span className="inline-block pr-8 font-semibold text-xl tracking-tight no-underline">
            GC Media
          </span>
        </div>
      </nav>
    );
  }
}

export default TitleComponent
