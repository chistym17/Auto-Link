import Link from 'next/link';

const CreateZapButton = () => {
  return (
    <Link href="/zap/create">
      <button
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition-colors duration-200"
      >
        Create Zaps
      </button>
    </Link>
  );
};

export default CreateZapButton;
