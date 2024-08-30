const rates = ({ Data, setData }) => {
  return (
    <div className="flex flex-col gap-7">
      <Input
        value={Data.Veg}
        setvalue={(newValue) => setData({ ...Data, Veg: newValue })}
        name="Veg"
        label="Vegetarian Platter"
      />
      <Input
        value={Data.Nonveg}
        setvalue={(newValue) => setData({ ...Data, Nonveg: newValue })}
        name="Nonveg"
        label="Non-Vegetarian Platter"
      />
      <Input
        value={Data.Decor}
        setvalue={(newValue) => setData({ ...Data, Decor: newValue })}
        name="Decor"
        label="Decoration"
      />
      <Input
        value={Data.Room}
        setvalue={(newValue) => setData({ ...Data, Room: newValue })}
        name="Room"
        label="Private Room"
      />
    </div>
  );
};
const Input = ({ value, setvalue, label }) => {
  return (
    <div className="flex flex-col gap-1 relative">
      <label>{label}</label>
      <span className="px-3">
        <img
          src="/images/rupee.png"
          className="w-[1.1rem] h-[1.1rem] absolute bottom-[18%]"
          alt="Rupee icon"
        />
      </span>
      <input
        type="number"
        value={value}
        onChange={(e) => setvalue(e.target.value)}
        placeholder={`Enter ${label} Price`}
        className="border-2 pl-9 placeholder:text-gray-500 bg-white active:border-black py-3 pr-2 rounded-lg"
      />
    </div>
  );
};

export default rates;
