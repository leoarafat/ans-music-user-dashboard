import axios from "axios";
import BASEURL from "../../../../Constants";
import toast from "react-hot-toast";

const ArticeChanalRequest = ({ handleTabChange }) => {
  const handleSubmitChanel = async (e) => {
    e.preventDefault();
    const channel_link = e.target.channel_link.value;
    const upc_1 = e.target.upc1.value;
    const topic_link = e.target.topic_link.value;
    const upc_2 = e.target.upc2.value;
    const upc_3 = e.target.upc3.value;
    const data = {
      channel_link,
      topic_link,
      upc_1,
      upc_2,
      upc_3,
      user: localStorage.getItem("user_id"),
    };
    console.log(data);
    try {
      const response = await axios.post(
        `${BASEURL}/user/add-artist-channel`,
        data,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      toast.success(`${response.data.message}`);

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      toast.error(`${error.response.data.message}`);
      throw new Error(error.response.data.message);
    }
  };
  return (
    <div className="p-5">
      <form
        onSubmit={handleSubmitChanel}
        className="input_div bg-white grid grid-cols-2 gap-4 rounded gap-x-6 p-5"
      >
        <label className="form-control w-full">
          <span className="text-sm font-semibold mb-2">
            CHANNEL LINK <span className="text-red-500">*</span>
          </span>
          <input
            type="url"
            name="channel_link"
            placeholder="Enter Channel Link"
            className="input  w-full bg-[#F7FEF8]"
          />
        </label>
        <label className="form-control w-full">
          <span className="text-sm font-semibold mb-2">
            UPC1 <span className="text-red-500">*</span>
          </span>
          <input
            type="text"
            name="upc1"
            placeholder="Enter UPC"
            className="input  w-full bg-[#F7FEF8]"
          />
        </label>
        <label className="form-control w-full">
          <span className="text-sm font-semibold mb-2">
            TOPIC LINK <span className="text-red-500">*</span>
          </span>
          <input
            type="url"
            name="topic_link"
            placeholder="Enter Topic Link"
            className="input  w-full bg-[#F7FEF8]"
          />
        </label>
        <label className="form-control w-full">
          <span className="text-sm font-semibold mb-2">
            UPC2<span className="text-red-500">*</span>
          </span>
          <input
            type="text"
            name="upc2"
            placeholder="Enter UPC"
            className="input  w-full bg-[#F7FEF8]"
          />
        </label>
        <label className="form-control w-full">
          <span className="text-sm font-semibold mb-2">
            UPC3<span className="text-red-500">*</span>
          </span>
          <input
            type="text"
            name="upc3"
            placeholder="Enter UPC"
            className="input  w-full bg-[#F7FEF8]"
          />
        </label>
        <div className="button flex justify-end items-end">
          <input
            type="submit"
            value={"submit"}
            className="btn px-8 btn-success text-white uppercase bg-green-600"
          />
        </div>
      </form>
    </div>
  );
};

export default ArticeChanalRequest;
