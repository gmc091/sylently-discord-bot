import "aos/dist/aos.css";
import Head from "next/head";
import Nav from "@components/Nav";
import Footer from "@components/Footer";
import ZPattern from "@components/ZPattern";
import InviteToServer from "@components/InviteToServer";
import Suggest from "@components/Suggest";
import AOS from "aos";
import { useEffect } from "react";

const Home = () => {
	useEffect(() => {
		AOS.init({
			duration: 2000,
			once: true, // Animations will occur exactly once
		});
	}, []);

	return (
		<div>
			<Head>
				<title>LUYB Dashboard</title>
			</Head>

			<Nav />

			<div className="mx-auto max-w-screen-2xl">
				<div className="px-4 flex flex-col my-20 gap-y-40">
					{/* Hero section / above the fold */}
					<div data-aos="fade-up">
						<ZPattern
							imageProps={{
								src: "/placeholder.png",
								width: 283,
								height: 283,
								className: "order-1 md:order-2 md:ml-auto",
							}}
						>
							<div className="flex flex-col gap-y-8 mt-8 md:mt-0 order-2 md:order-1">
								<h1 className="font-black text-3xl md:text-6xl md:max-w-3xl">
									The ultimate discord bot for your community
								</h1>

								<h2 className="font-semibold text-lg md:text-2xl md:max-w-4xl">
									Revolutionize your community with our bot: ensuring safety
									with robust moderation and boosting engagement through a
									customizable leveling system. It's community management,
									reimagined.
								</h2>

								<InviteToServer />
							</div>
						</ZPattern>
					</div>

					<hr data-aos="fade-up" className="border-custom" />

					{/* ZPattern 1 */}
					<div data-aos="fade-up">
						<ZPattern
							imageProps={{
								src: "/levels.png",
								height: 500,
								width: 500,
								className: "md:ml-auto",
							}}
						>
							<div className="flex flex-col gap-y-8 mb-8">
								<h2 className="font-black text-2xl md:text-4xl">
									Reward members for being active
								</h2>

								<p className="text-sm md:text-xl font-semibold leading-8 md:max-w-md">
									Use our levels system to reward members for their activity in
									your server. Let your members customize their rank card and
									let them compete for a spot on the leaderboard! You can
									automatically let Maki assign roles when a member reaches a
									certain level to reward give them access to special channels
									and permissions.
								</p>
								<InviteToServer />
							</div>
						</ZPattern>
					</div>

					{/* ZPattern 2 */}
					<div data-aos="fade-up">
						<ZPattern
							imageProps={{
								src: "/roles.png",
								height: 500,
								width: 500,
								className: "md:order-1",
							}}
						>
							<div className="flex flex-col gap-y-8 mb-8 md:order-2 md:ml-auto">
								<h2 className="font-black text-2xl md:text-4xl">
									Easily manage the roles in your server
								</h2>

								<p className="text-sm md:text-xl font-semibold leading-8 md:max-w-md">
									Use the reaction roles feature to give your community the
									option to select roles to be pinged for announcements, to
									access hidden channels, or just to identify themselves.
								</p>
								<InviteToServer />
							</div>
						</ZPattern>
					</div>

					{/* ZPattern 3 */}
					<div data-aos="fade-up">
						<ZPattern
							imageProps={{
								src: "/moderation.png",
								height: 500,
								width: 500,
								className: "md:ml-auto",
							}}
						>
							<div className="flex flex-col gap-y-8 mb-8">
								<h2 className="font-black text-2xl md:text-4xl">
									Customizable Features
								</h2>

								<p className="text-sm md:text-xl font-semibold leading-8 md:max-w-md">
									Our Discord bot is designed with customization in mind.
									Whether you need specific roles assigned, customized welcome
									messages, or specific automated responses, this bot can be
									tailored to meet your server's unique needs.
								</p>
								<InviteToServer />
							</div>
						</ZPattern>
					</div>

					<div data-aos="fade-up">
						<hr className="border-custom" />

						<div className="text-white text-center flex flex-col gap-y-6 items-center py-20">
							<div className="font-bold text-2xl md:text-4xl md:max-w-2xl">
								Our bot is still under active development, so feel free to
								submit a suggestion!
							</div>
							<div></div>
							<div></div>

							<Suggest />
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default Home;
