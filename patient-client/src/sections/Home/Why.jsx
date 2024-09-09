const Why = () => {
  const cards = [
    {
      title: "EFFECIENCY",
      content:
        "Streamlined appointment scheduling that fits into your busy lifestyle.",
    },
    {
      title: "CONVENIENCE",
      content:
        "Access to a network of trusted healthcare professionals in your area.",
    },
    {
      title: "PERSONALIZATION:",
      content:
        "Tailored recommendations and reminders to help you stay on top of your health.",
    },
  ];
  return (
    <div className="w-[90%] mx-auto py-10">
      <h1 className="text-center text-3xl font-semibold text-primary">
        WHY CHOOSE US?
      </h1>
      <div className="mt-10 flex flex-col md:flex-row justify-center w-[80%] mx-auto">
        {cards.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-5 text-center border border-black/20 p-10 hover:bg-primary/40 hover:border-primary/40 transition-all ease-out duration-500"
          >
            <h3 className="font-semibold text-2xl">{item.title}</h3>
            <p className="text-gray-500">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Why;
