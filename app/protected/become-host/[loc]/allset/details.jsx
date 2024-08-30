
const details = ({ value, setvalue }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label>Create a captivating title for your place </label>
        <input
          type="text"
          value={value.title}
          onChange={(e) => setvalue({ ...value, title: e.target.value })}
          placeholder={`Enter title `}
          className="border-2 pl-4 placeholder:text-gray-500 bg-white active:border-black py-3 pr-2 rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>Craft an engaging description</label>
        <textarea
          cols="30"
          rows="10"
          placeholder="Tell about your place"
          value={value.description}
          onChange={(e) => setvalue({ ...value, description: e.target.value })}
          className="border-2 pl-4 placeholder:text-gray-500 resize-none bg-white active:border-black py-3 pr-2 rounded-lg"
        ></textarea>
      </div>
    </div>
  );
};

export default details;

