import { useState } from "react";
import { MdClose } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";
import { EmailSelector, SolanaSelector, DBSelector, availableActions, availableTriggers } from "./create/actions"; // Ensure DBSelector is imported
import { AiOutlineCreditCard } from "react-icons/ai";
import { Input } from "../../components/Input";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";

export function Modal({ index, onSelect, availableItems }: { index: number, onSelect: (props: null | { name: string; id: string; metadata: any; }) => void, availableItems: { id: string, name: string, image: string; }[] }) {
    const [step, setStep] = useState(0);
    const [selectedAction, setSelectedAction] = useState<{ id: string; name: string; }>();
    const isTrigger = index === 1;

    return (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center rounded-xl w-full h-[calc(100%-1rem)] max-h-full bg-[#EDE9F0] bg-opacity-80">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow-lg">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-[#FD9B59]">
                        <div className="text-xl text-white">
                            Select {isTrigger ? "Trigger" : "Action"}
                        </div>
                        <button onClick={() => onSelect(null)} type="button" className="text-white hover:text-gray-300 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                            <MdClose className="w-6 h-6" />
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        {step === 1 && selectedAction?.id === "action_1" && (
                            <EmailSelector setMetadata={(metadata) => {
                                onSelect({
                                    ...selectedAction,
                                    metadata
                                });
                            }} />
                        )}
                        {step === 1 && selectedAction?.id === "action_2" && (
                            <SolanaSelector setMetadata={(metadata) => {
                                onSelect({
                                    ...selectedAction,
                                    metadata
                                });
                            }} />
                        )}
                        {step === 1 && selectedAction?.id === "action_6" && (
                            <DBSelector onSubmit={(metadata) => {
                                onSelect({
                                    ...selectedAction,
                                    metadata
                                });
                            }} />
                        )}
                        {step === 0 && (
                            <div className="space-y-4">
                                {availableItems.map(({ id, name, image }) => (
                                    <div 
                                        onClick={() => {
                                            if (isTrigger) {
                                                onSelect({
                                                    id,
                                                    name,
                                                    metadata: {}
                                                });
                                            } else {
                                                setStep(s => s + 1);
                                                setSelectedAction({
                                                    id,
                                                    name
                                                });
                                            }
                                        }} 
                                        className="flex border p-4 cursor-pointer hover:bg-[#F38186] hover:text-white transition-all duration-300 ease-in-out rounded-lg items-center space-x-4"
                                        key={id}
                                    >
                                        <img src={image} width={40} className="rounded-full" alt={name} />
                                        <div className="flex flex-col justify-center">
                                            <span className="text-lg font-semibold">{name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {step === 1 && (
                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                            <BsArrowRight className="w-6 h-6 text-gray-600" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
