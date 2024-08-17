"use client";

import { Appbar } from "../../../components/Appbar";
import { Input } from "../../../components/Input";
import { ZapCell } from "../../../components/ZapCell";
import { PrimaryButton } from "../../../components/buttons/PrimaryButton";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Modal} from "../functions";
import SideNav from "./sidenav";
import { AiOutlineForm, AiOutlineMail, AiOutlineUser, AiOutlineGithub, AiOutlineDollarCircle } from 'react-icons/ai';
import { availableActions, availableTriggers } from "./actions";

// Manually defined available triggers and their associated actions

const user = {
    name: "chisty",
    email: "chisty@gmail.com",
    avatar: '../../albert-dera-ILip77SbmOE-unsplash.jpg'
}

export default function Page() {

    const handleCreateZap = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/createzap`, {
                "availableTriggerId": selectedTrigger.id,
                "triggerMetadata": {},
                "actions": selectedActions.map(a => ({
                    availableActionId: a.availableActionId,
                    actionMetadata: a.metadata
                }))
            });
            console.log('Response:', response.data);
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

    const router = useRouter();
    const [selectedTrigger, setSelectedTrigger] = useState<{ id: string; name: string; actions: string[] }>();
    const [selectedActions, setSelectedActions] = useState<{
        index: number;
        availableActionId: string;
        availableActionName: string;
        metadata: any;
    }[]>([]);
    const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null);

    return (
        <div>
            <div className="w-full min-h-screen ">
                <div className="flex justify-center w-full">
                    <ZapCell onClick={() => {
                        setSelectedModalIndex(1);
                    }} name={selectedTrigger?.name ? selectedTrigger.name : "Trigger"} index={1} />
                </div>
                <div className="w-full pt-2 pb-2">
                    {selectedActions.map((action, index) => (
                        <div className="pt-2 flex justify-center" key={index}>
                            <ZapCell onClick={() => {
                                setSelectedModalIndex(action.index);
                            }} name={action.availableActionName ? action.availableActionName : "Action"} index={action.index} />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center">
                    <div>
                        <PrimaryButton onClick={() => {
                            setSelectedActions(a => [...a, {
                                index: a.length + 2,
                                availableActionId: "",
                                availableActionName: "",
                                metadata: {}
                            }])
                        }}>
                            <div className="text-2xl">+</div>
                        </PrimaryButton>
                    </div>
                </div>
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

            <button className="px-6 py-3 mt-5 mb-5 text-black " onClick={handleCreateZap}>Publish zap</button>
        </div>
        
    );
    
}
