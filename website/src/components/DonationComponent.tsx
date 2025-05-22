// DonationComponent.jsx
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Gift, Repeat, Rewind, RewindIcon, ShoppingBag } from 'lucide-react';
import clsx from 'clsx';

// Mock data (same as before)
const mockInteractionOptions = [
    {
        id: 'uuid1',
        option_name: 'coffee',
        option_type: 'support_small',
        option_redirect_url: null,
        display_label: '☕',
        display_order: 1,
        value: 1,
        description: 'A warm virtual coffee to keep the creator fueled! Every sip helps.',
    },
    {
        id: 'uuid2',
        option_name: 'beer',
        option_type: 'support_medium',
        option_redirect_url: null,
        display_label: '🍺',
        display_order: 2,
        value: 3,
        description: "Cheers! A round of virtual beers for a job well done. Let's celebrate!",
    },
    {
        id: 'uuid3',
        option_name: 'third',
        option_type: 'support_xl',
        option_redirect_url: null,
        display_label: '📱',
        display_order: 3,
        value: 5,
        description: 'Bem preciso de um novo protetor de ecrã!',
    },
    {
        id: 'uuid3',
        option_name: 'full_meal',
        option_type: 'support_xl',
        option_redirect_url: null,
        display_label: '🦁',
        display_order: 4,
        value: 9,
        description: 'Mais perto do lugar de leão!',
    }
];

const DonationComponent = ({
    revolutUsername = "sportingcampeao",
    tshirtImageUrl = "https://cdn-scp.azureedge.net/lojaverdeonline/0012596_camisola-principal-cpub-2526.jpeg", // Pass your t-shirt image URL as a prop
    backTshirtUrl = "https://cdn-scp.azureedge.net/lojaverdeonline/0012597_camisola-principal-cpub-2526.jpeg"
}) => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [isFrontTshirt, setIsFronttshirt] = useState(true)
    const [activeDescription, setActiveDescription] = useState({ title: '', text: '' });
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const sortedOptions = [...mockInteractionOptions].sort((a, b) => a.display_order - b.display_order);
        setOptions(sortedOptions);
    }, []);

    const handleOptionClick = (option) => {
        setTotalAmount(prevAmount => prevAmount + option.value);
        if (option.description) {
            setActiveDescription({ title: option.option_name, text: option.description });
        }
    };

    const handleReset = () => {
        setTotalAmount(0);
        setActiveDescription({ title: '', text: '' });
    };

    const handleDonate = (isShopTshirt = false) => {
        if (totalAmount >= 0 && revolutUsername) {
            const revolutUrl = `https://revolut.me/${revolutUsername}/${totalAmount}EUR`;
            console.log(`Redirecting to: ${revolutUrl}`);
            //window.location.href = revolutUrl;
            window.open(isShopTshirt ? 'https://lojaverde.sporting.pt/pt/produto/camisola-principal-cpub-2526' : revolutUrl, '_blank');
        } else if (!revolutUsername) {
            console.error("Revolut username is not set!");
            alert("Donation system error: Revolut username missing.");
        }
    };

    const formatTitle = (title) => {
        if (!title) return '';
        return title.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <div className="font-sans p-6 md:px-8 rounded-xl max-w-3xl mx-auto text-slate-800 text-center">
            <div className="mb-8">
                {/* <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                    Contribui para o lugar de Leão ao pé do tio João!
                </h2> */}
                {/* <p className="text-slate-600 text-lg">Show your appreciation with a virtual treat!</p> */}
            </div>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-8">
                {/* Options Panel */}
                <div className="flex-1 bg-white p-5 rounded-lg">
                    <h3 className="text-xl font-semibold text-sporting border-b-2 border-slate-200 pb-3 mb-4">
                    Contribui para o lugar de Leão ao pé do tio João!
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                        {options.map(option => (
                            <button
                                key={option.id}
                                className=" text-primary py-3 px-2 rounded-md text-sm shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sporting focus:ring-opacity-50"
                                onClick={() => handleOptionClick(option)}
                                title={`Add ${option.value}€`}
                            >
                                {option.display_label}
                            </button>
                        ))}
                    </div>
                    {activeDescription.text && (
                        <div className="bg-slate-200 p-4 rounded-lg text-left w-full max-w-sm shadow-inner border-l-4 border-sporting mt-4 lg:mt-0">
                            <h4 className="text-lg font-semibold text-green-700 mb-1">
                                {formatTitle(activeDescription.title)}!
                            </h4>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                {activeDescription.text}
                            </p>
                        </div>
                    )}
                    <Button asChild variant="outline" className="mt-4 w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-4">
                        <a href={`https://revolut.me/${revolutUsername}/${totalAmount}EUR/💚🤍❤️`} target="_blank" rel="noopener noreferrer">
                            <Gift size={18} className="transition-colors" />
                            Revolut do Leão
                        </a>
                        </Button>
                </div>

                {/* Display Panel */}
                {totalAmount > 0 && (
                    <div className="flex-1 flex flex-col items-center gap-5">
                    {/* T-Shirt Display with Real Image */}
                    <div className="text-center w-full max-w-[200px] sm:max-w-[240px] mx-auto"> {/* Control max width of T-shirt display */}
                        <div className="relative w-full"> {/* Parent for positioning, takes full width of its constrained parent */}
                            <img
                                src={isFrontTshirt ? tshirtImageUrl : backTshirtUrl}
                                alt="Support T-Shirt"
                                className="w-full h-auto object-contain rounded-md" // Image scales, maintains aspect ratio
                            />
                            {totalAmount > 0 && !isFrontTshirt ? (
                                <>
                                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span className="text-3xl sm:text-4xl font-bold text-primary p-2 rounded-md whitespace-nowrap">
                                        {totalAmount}
                                    </span>
                                </div>
                                {/* <div onClick={() => handleDonate(true)} className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <Button asChild variant="ghost" className="w-full sm:w-auto text-primary-foreground px-4">
                                    <ShoppingBag size={18} className="mr-2 text-sporting group-hover:text-amber-500 transition-colors" />
                                </Button>
                                </div> */}
                                <div onClick={() => setIsFronttshirt(!isFrontTshirt)} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <div className="flex-1">
                                        <button
                                            className={clsx(
                                                'group flex items-center gap-1.5 pr-1.5 transition-[color]',
                                            )}
                                        >
                                            <div className="relative before:absolute before:-inset-2.5 before:rounded-full before:transition-[background-color] before:group-hover:bg-sporting/30">
                                                <Repeat
                                                    color='green'
                                                    absoluteStrokeWidth
                                                    className={'~size-4/5 group-active:spring-duration-[25] spring-bounce-[65] spring-duration-300 transition-transform group-active:scale-[80%]'
                                                    }
                                                />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div onClick={() => {setTotalAmount(0); setActiveDescription({title: '', text: ''})}} className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <div className="flex-1">
                                        <button
                                            className={clsx(
                                                'group flex items-center gap-1.5 pr-1.5 transition-[color]',
                                            )}
                                        >
                                            <div className="relative before:absolute before:-inset-2.5 before:rounded-full before:transition-[background-color] before:group-hover:bg-sporting/30">
                                                <RewindIcon
                                                    color='green'
                                                    absoluteStrokeWidth
                                                    className={'~size-4/5 group-active:spring-duration-[25] spring-bounce-[65] spring-duration-300 transition-transform group-active:scale-[80%]'
                                                    }
                                                />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                </>
                            ) : totalAmount > 0 &&
                                <div onClick={() => setIsFronttshirt(!isFrontTshirt)} className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <div className="flex-1">
                                        <button
                                            className={clsx(
                                                'group flex items-center gap-1.5 pr-1.5 transition-[color]',
                                            )}
                                        >
                                            <div className="relative before:absolute before:-inset-2.5 before:rounded-full before:transition-[background-color] before:group-hover:bg-sporting/30">
                                                <Repeat
                                                    color='white'
                                                    absoluteStrokeWidth
                                                    className={'~size-4/5 group-active:spring-duration-[25] spring-bounce-[65] spring-duration-300 transition-transform group-active:scale-[80%]'
                                                    }
                                                />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>


                    {/* Description Box */}
                    {/* {activeDescription.text && (
                        <div className="bg-slate-200 p-4 rounded-lg text-left w-full max-w-sm shadow-inner border-l-4 border-green-500 mt-4 lg:mt-0">
                            <h4 className="text-lg font-semibold text-green-700 mb-1">
                                {formatTitle(activeDescription.title)}!
                            </h4>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                {activeDescription.text}
                            </p>
                        </div>
                    )} */}
                </div>
                )}
            </div>

            {/* Action Buttons */}
            {/* <div className="mt-6 flex justify-center items-center gap-4 flex-wrap">
                {totalAmount >= 0 && (
                    <button
                        className="min-w-[180px] bg-green-500 hover:bg-green-600 active:bg-green-700 text-white py-3 px-6 rounded-lg text-base font-semibold shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                        onClick={handleDonate}
                    >
                        Saudações Leoninas
                    </button>
                )}
                <button
                    className="min-w-[120px] bg-red-500 hover:bg-red-600 active:bg-red-700 text-white py-3 px-6 rounded-lg text-base font-semibold shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                    onClick={handleReset}
                >
                    Reset
                </button>
            </div> */}
        </div>
    );
};

export default DonationComponent;