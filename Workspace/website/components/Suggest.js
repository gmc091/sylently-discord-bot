const Suggest = () => {
	return (
		<a href="#" className="font-semibold text-sm md:text-xl">
			<button
				className="rounded-xl py-3.5 px-10 bg-cta-button transform transition-all duration-200"
				style={{ backgroundColor: "#0076FF" }}
				onMouseEnter={(e) => (e.target.style.background = "#3994FF")}
				onMouseLeave={(e) => (e.target.style.background = "#0076FF")}
			>
				Suggest
			</button>
		</a>
	);
};

export default Suggest;
