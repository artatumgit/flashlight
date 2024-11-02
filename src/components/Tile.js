import {
	BrowserRouter as Router,
	Link,
} from "react-router-dom";

function Tile (data) {
	const newTo = {
		pathname:"/Page/"+data.data.tokenId
	}
	
return (
<Link to={newTo}>
	{data.data.description && <div className="group overflow-hidden cursor-pointer ml-12 mt-5 mb-12 mr-12 flex flex-col justify-center items-center rounded-lg w-60 h-60 md:w-72 md:h-72 sm:w-48 sm:h-48 shadow-2xl">
	<img src={data.data.file} alt={data.data.description} className="w-72 h-72 click:w-full click:h-full rounded-lg object-cover" />
		//background div
		<div className="absolute grid place-items-center text-white overflow-hidden rounded-lg w-60 h-60 md:w-72 md:h-72 lg:w-72 lg:h-72 sm:w-48 sm:h-48 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-80">
			<p className="display-inline">
				{data.data.description}
			</p>
		</div>
		<div className= "text-white w-full p-2 bg-gradient-to-t from-[#454545] to-transparent rounded-lg pt-5 -mt-20">
			<strong className="text-xl">{data.data.name}</strong>
		</div>
	</div>}
</Link>
)
};

export default Tile;
