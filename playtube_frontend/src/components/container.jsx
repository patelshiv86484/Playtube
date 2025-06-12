import React from 'react'
//all are displayed as it is just styling is done overhere.
function Container({children}) {
  return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;//pass childrens inside init.
}

export default Container    