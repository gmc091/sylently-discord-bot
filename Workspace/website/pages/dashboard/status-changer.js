import DashNav from "@components/DashNav";
import secure from "@util/secure";

const StatusChanger = () => {
	return (
		<div className="h-screen text-white md:flex">
			<DashNav />

			<div>Status Changer</div>
		</div>
	);
};

export default StatusChanger;

export async function getServerSideProps(context) {
	return secure(context, ({ session }) => {
		return {
			props: { session },
		};
	});
}
