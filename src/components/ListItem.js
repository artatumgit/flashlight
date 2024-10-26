import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";
  
function ListItem(data) {
    const newTo = {
        pathname:"/Page/"+data.data.tokenId
    }
  return (
	<Link to={newTo}>
    {data.data.description && <article className="flex items-start space-x-6 p-6 mr-6 transition-colors duration-300 ease-in-out hover:bg-slate-300">
      <img src={data.data.file} alt="" width="60" height="88" className="flex-none rounded-md bg-slate-100" />
      <div className="min-w-0 relative flex-auto">
        <h2 className="font-semibold text-slate-900 truncate pr-20">{data.data.name}</h2>
        <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
          <div>
            <dt className="sr-only">Description</dt>
            <dd className="px-1.5 ring-1 ring-slate-200 rounded">{data.data.description}</dd>
          </div>
		  <div className="ml-2">
            <dt className="sr-only">Name</dt>
            <dd>{data.data.name}</dd>
          </div>
        </dl>
      </div>
    </article>}
	</Link>
  )
}

export default ListItem;