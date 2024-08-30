import Prices from "./prices";
import Host from "./host";
import Facility from "./facilities";
import Tour from "./tour";

const Description = ({ info }) => {
    return (
        <section className="flex max-[1000px]:flex-col my-9 gap-16">
            <div className="flex flex-col gap-7 min-[1400px]:w-[75%] min-[1000px]:w-[60%]">
                <div className="flex flex-col gap-3">
                    <h1 className="font-bold text-2xl">About the Hall</h1>
                    <p className="text-justify">
                        {info.description ? info.description : "loading...."}
                    </p>
                </div>
                <hr />
                <Part
                    heading={"Services Provided"}
                    component={<Facility points={info} />}
                />
                <Part
                    heading={"Meet your Host "}
                    component={<Host data={info.host} />}
                />
                <Part
                    heading={"Arrange a Virtual Tour"}
                    component={<Tour host={info.host} hall={info._id} />}
                />
            </div>

            <div className="sticky max-[1000px]:w-full min-[1400px]:w-1/4 min-[1000px]:w-1/3 top-9 self-start">
                <Prices rates={info} />
            </div>
        </section>
    );
};

const Part = ({ heading, component }) => {
    return (
        <>
            <div className="flex flex-col gap-3">
                <h1 className="font-bold text-2xl">{heading}</h1>
                {component}
            </div>
            <hr />
        </>
    );
};

export default Description;

