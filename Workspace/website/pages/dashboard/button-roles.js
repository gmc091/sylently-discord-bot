import DashNav from "@components/DashNav";
import secure from "@util/secure";

const ButtonRoles = () => {
	return (
		<div className="h-screen text-white md:flex">
			<DashNav />

			<div>Button Roles</div>
		</div>
	);
};

export default ButtonRoles;

export async function getServerSideProps(context) {
	return secure(context, ({ session }) => {
		return {
			props: { session },
		};
	});
}
