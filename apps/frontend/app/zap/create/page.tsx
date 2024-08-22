"use client";
import { ZapCell } from "../../../components/ZapCell";
import { PrimaryButton } from "../../../components/buttons/PrimaryButton";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Modal } from "../functions";
import { availableActions, availableTriggers } from "./actions";



const Page =  () => {
    const [selectedTrigger, setSelectedTrigger] = useState<{ id: string; name: string; actions: string[] }>();
    const [selectedActions, setSelectedActions] = useState<{
        index: number;
        availableActionId: string;
        availableActionName: string;
        metadata: any;
    }[]>([]);
    const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null);
    const [isWebhookModalOpen, setIsWebhookModalOpen] = useState(false);
    const [webhookUrl, setWebhookUrl] = useState('');

    const handleCreateZap = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/createzap`, {
                "availableTriggerId": selectedTrigger?.id,
                "triggerMetadata": {},
                "actions": selectedActions.map(a => ({
                    availableActionId: a.availableActionId,
                    actionMetadata: a.metadata
                }))
            });
            console.log('Response:', response.data);

            if (response.data.webhookUrl) {
                setWebhookUrl(response.data.webhookUrl);
                setIsWebhookModalOpen(true);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error Response:', error.response?.data);
                console.error('Error Status:', error.response?.status);
                console.error('Error Headers:', error.response?.headers);
            } else {
                console.error('Unexpected Error:', error);
            }
        }
    };

    const handleCloseWebhookModal = () => {
        setIsWebhookModalOpen(false);
        setWebhookUrl('');
    };

    const handleCopyWebhookUrl = () => {
        navigator.clipboard.writeText(webhookUrl);
        alert('Webhook URL copied to clipboard');
    };

    return (
        <div className="w-full min-h-screen">
            <div className="flex justify-center w-full">
                <ZapCell
                    onClick={() => setSelectedModalIndex(1)}
                    name={selectedTrigger?.name ? selectedTrigger.name : "Trigger"}
                    index={1}
                />
            </div>
            <div className="w-full pt-2 pb-2">
                {selectedActions.map((action, index) => (
                    <div className="pt-2 flex justify-center" key={index}>
                        <ZapCell
                            onClick={() => setSelectedModalIndex(action.index)}
                            name={action.availableActionName ? action.availableActionName : "Action"}
                            index={action.index}
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                <PrimaryButton onClick={() => {
                    setSelectedActions(a => [...a, {
                        index: a.length + 2,
                        availableActionId: "",
                        availableActionName: "",
                        metadata: {}
                    }]);
                }}>
                    <div className="text-2xl">+</div>
                </PrimaryButton>
            </div>

            {selectedModalIndex && (
                <Modal
                    availableItems={selectedModalIndex === 1 ? availableTriggers : availableActions.filter(action => selectedTrigger?.actions.includes(action.id))}
                    onSelect={(props: null | { name: string; id: string; metadata: any; }) => {
                        if (props === null) {
                            setSelectedModalIndex(null);
                            return;
                        }
                        if (selectedModalIndex === 1) {
                            setSelectedTrigger({
                                id: props.id,
                                name: props.name,
                                actions: availableTriggers.find(trigger => trigger.id === props.id)?.actions || []
                            });
                        } else {
                            setSelectedActions(a => {
                                let newActions = [...a];
                                newActions[selectedModalIndex - 2] = {
                                    index: selectedModalIndex,
                                    availableActionId: props.id,
                                    availableActionName: props.name,
                                    metadata: props.metadata
                                };
                                return newActions;
                            });
                        }
                        setSelectedModalIndex(null);
                    }}
                    index={selectedModalIndex}
                />
            )}


            {isWebhookModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h2 className="text-2xl font-bold text-center mb-4 text-[#F38186]">Webhook Integration</h2>
                        <p className="text-gray-700 text-center mb-4">
                            Integrate the following webhook URL with your app to run the zap:
                        </p>
                        <input
                            type="text"
                            value={webhookUrl}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#FD9B59]"
                        />
                        <div className="flex justify-center">
                            <button
                                onClick={handleCopyWebhookUrl}
                                className="bg-[#F38186] text-white px-4 py-2 rounded mr-2 hover:bg-[#fd7b6e] transition duration-300"
                            >
                                Copy Webhook URL
                            </button>
                            <button
                                onClick={handleCloseWebhookModal}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>

            )}

            <div className="flex justify-center">
                <button
                    className="bg-gradient-to-r from-[#F38186] to-[#FD9B59] text-center mt-3 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
                    onClick={handleCreateZap}
                >
                    Publish Zap
                </button>
            </div>

        </div>
    );
}
export default Page;
