import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

const links = [
	{
		name: "Button Roles",
		url: "/dashboard/button-roles",
		icon: "/button-roles.svg",
	},
	{
		name: "Status Changer",
		url: "/dashboard/status-changer",
		icon: "/status-changer.svg",
	},
];

const DashNav = () => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	const currentPage = router.pathname.split("/dashboard/")[1];

	return (
		<header
			className="md:h-full md:w-72 md:border-r md:border-zinc-700 relative text-white py-2"
			style={{ backgroundColor: "#1F2129" }}
		>
			<div className="container mx-auto flex items-center justify-between">
				<nav className="hidden md:grid justify-items-center w-full gap-3 mt-4">
					{links.map(({ name, url, jsx, icon }) => {
						if (url) {
							return (
								<div key={name} className="w-full h-12 grid px-5 py-3 relative">
									<div
										className="absolute left-0 top-0 bottom-0 w-64 rounded-md mx-3 opacity-80 z-0"
										style={{
											backgroundColor: url.endsWith(currentPage)
												? "#343645"
												: "transparent",
										}}
									/>

									<Link href={url} title={name} className="z-10">
										<div className="flex items-center">
											<Image src={icon} width={24} height={24} alt={name} />
											<a className="ml-4">{name}</a>
										</div>
									</Link>
								</div>
							);
						}

						return jsx;
					})}
				</nav>

				<button
					className="flex flex-col md:hidden gap-1 p-2 ml-auto"
					onClick={() => setIsOpen(!isOpen)}
				>
					<div className="w-6 h-1 bg-white rounded-md"></div>
					<div className="w-6 h-1 bg-white rounded-md"></div>
					<div className="w-6 h-1 bg-white rounded-md"></div>
				</button>

				<nav
					className={`bg-nav w-full p-4 absolute top-12 left-0 ${
						isOpen ? "flex md:hidden" : "hidden"
					}`}
				>
					<div className="flex flex-col gap-1 w-full">
						{links.map(({ name, url, jsx }) => {
							if (url) {
								return (
									<Link key={name} href={url}>
										<button className="w-full text-lg font-semibold p-2 block">
											{name}
										</button>
									</Link>
								);
							}

							return jsx;
						})}
					</div>
				</nav>
			</div>
		</header>
	);
};

export default DashNav;
