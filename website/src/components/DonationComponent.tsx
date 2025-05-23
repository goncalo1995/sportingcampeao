// DonationComponent.jsx
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Copy, Euro, Gift, MinusIcon, PlusIcon, Repeat, Rewind, RewindIcon, ShoppingBag } from 'lucide-react';
import clsx from 'clsx';
const IBAN_NUMBER = "PT50004587004032279704616";

const playersByShirtNumber = {
    "1": { name: "Franco Israel", position: "Guarda-Redes", shirtNumber: "1" },
    "2": { name: "Matheus Reis", position: "Lateral Esquerdo", shirtNumber: "2" },
    "3": { name: "Jeremiah St. Juste", position: "Defesa Central", shirtNumber: "3" },
    "5": { name: "Hidemasa Morita", position: "Médio Centro", shirtNumber: "5" },
    "6": { name: "Zeno Debast", position: "Defesa Central", shirtNumber: "6" }, // Assuming from "6 RSC Anderlecht Zeno Debast"
    "8": { name: "Pedro Gonçalves", position: "Extremo Esquerdo", shirtNumber: "8" },
    "9": { name: "Viktor Gyökeres", position: "Ponta de Lança", shirtNumber: "9" },
    "11": { name: "Nuno Santos", position: "Lateral Esquerdo", shirtNumber: "11" },
    "17": { name: "Francisco Trincão", position: "Extremo Direito", shirtNumber: "17" },
    "19": { name: "Conrad Harder", position: "Ponta de Lança", shirtNumber: "19" }, // Assuming from "19 FC Nordsjaelland Conrad Harder"
    "20": { name: "Maxi Araújo", position: "Médio Esquerdo", shirtNumber: "20" }, // Assuming from "20 Deportivo Toluca Maxi Araújo"
    "21": { name: "Geny Catamo", position: "Extremo Direito", shirtNumber: "21" },
    "22": { name: "Iván Fresneda", position: "Lateral Direito", shirtNumber: "22" },
    "23": { name: "Daniel Bragança", position: "Médio Centro", shirtNumber: "23" },
    "24": { name: "Rui Silva", position: "Guarda-Redes", shirtNumber: "24" }, // Assuming from "24 Real Bétis Rui Silva"
    "25": { name: "Gonçalo Inácio", position: "Defesa Central", shirtNumber: "25" },
    "26": { name: "Ousmane Diomande", position: "Defesa Central", shirtNumber: "26" },
    "30": { name: "Biel", position: "Extremo Esquerdo", shirtNumber: "30" }, // Assuming from "30 EC Bahia Biel"
    "42": { name: "Morten Hjulmand", position: "Médio Defensivo", shirtNumber: "42" },
    "47": { name: "Ricardo Esgaio", position: "Lateral Direito", shirtNumber: "47" },
    "51": { name: "Diogo Pinto", position: "Guarda-Redes", shirtNumber: "51" },
    "52": { name: "João Simões", position: "Médio Centro", shirtNumber: "52" }, // Assuming from "52 Sporting CP B João Simões"
    "57": { name: "Geovany Quenda", position: "Extremo Esquerdo", shirtNumber: "57" }, // Assuming from "57 Sporting CP Sub-23 Geovany Quenda"
    "72": { name: "Eduardo Quaresma", position: "Defesa Central", shirtNumber: "72" },
    "73": { name: "Eduardo Felicíssimo", position: "Médio Defensivo", shirtNumber: "73" } // Assuming from "73 Sporting CP B Eduardo Felicíssimo"
  };

// Mock data (same as before)
const playerThankYouMessages = {
    "1": (name) => `Obrigado pelo teu €1! Como o ${name}, és o nosso número 1! Defender este apoio é o nosso golo! 🥅🧤`,
    "24": (name) => `€24! Grande defesa! O ${name} ficaria orgulhoso deste apoio. Mãos de ferro, coração de Leão! 🦁`,
    "51": (name) => `€51! Uau, o jovem ${name} agradece este investimento no futuro! Brilhante! ✨`,
    "25": (name) => `€25! Defesa imperial! Com este apoio, és o nosso ${name}, patrão da área! 💪`,
    "26": (name) => `€26! Que muralha! O ${name} não deixaria passar nada, tal como o teu apoio! Obrigado! 🛡️`,
    "6": (name) => `€6! Com a classe do ${name}, este apoio vale ouro! Obrigado pela solidez! 💎`,
    "72": (name) => `€72! Incrível! O ${name} mostra garra e tu mostras um apoio tremendo! Força! 🔥`,
    "3": (name) => `€3! Rápido e eficaz como o ${name}! Este apoio chegou na hora certa! ⚡`,
    "11": (name) => `€11! Com a magia do ${name} na ala, este apoio dá-nos asas! Obrigado, craque! 🚀`,
    "2": (name) => `€2! Polivalente como o ${name}, este apoio vale por muitos! Obrigado! 👍`,
    "22": (name) => `€22! Futuro craque! O ${name} agradece este sprint de generosidade! 🏃💨`,
    "47": (name) => `€47! Experiência e dedicação! Como o capitão ${name} (no espírito!), este apoio é fundamental! Obrigado! 🟢⚪`,
    "42": (name) => `€42! Que pulmão! O nosso ${name} do meio-campo agradece este apoio incansável! Viking! 🛡️🇩🇰`,
    "73": (name) => `€73! Com a juventude e talento do ${name}, este apoio é um investimento no futuro! Obrigado! 🌱`,
    "5": (name) => `€5! Samurai! Com a garra do ${name}, este apoio é uma lição de entrega! Arigato! 🎌`,
    "23": (name) => `€23! Que classe, ${name}! Este apoio tem o toque de magia do nosso maestro! 🪄`,
    "52": (name) => `€52! Visão de jogo! O jovem ${name} vê um futuro brilhante com este apoio! Obrigado! 🌟`,
    "20": (name) => `€20! Golaço! O ${name} faria um golaço destes! Obrigado pelo espetáculo de apoio! ⚽️`,
    "57": (name) => `€57! Driblador! Como o ${name}, fintaste a indiferença e marcaste um golo de solidariedade! Obrigado! 🌪️`,
    "8": (name) => `€8! POTE de OURO! O nosso ${name} agradece este remate certeiro de generosidade! Obrigado, mágico! ✨🎯`,
    "30": (name) => `€30! Que velocidade! O ${name} agradece este apoio que nos leva mais longe! Valeu! 💨🇧🇷`,
    "17": (name) => `€17! TRINCA MÁGICO! Este apoio tem a classe e a finta do ${name}! Obrigado pelo espetáculo! 🪄✨`,
    "21": (name) => `€21! Flecha africana! O ${name} voaria com este apoio! Obrigado pela energia contagiante! 🇲🇿⚡`,
    "9": (name) => `€9! GYÖKERES! Matador! Este apoio é um golo na gaveta! Obrigado, Viking goleador! 🇸🇪⚽️💪`,
    "19": (name) => `€19! O futuro ${name} agradece! Este apoio é um investimento num goleador! Dinamáquina! 🇩🇰💣`,
    // Add more general messages for amounts not matching a player
    "generic_small": (amount) => `Obrigado pelos teus €${amount}, cada euro conta! 💚🤍`,
    "generic_medium": (amount) => `Wow, €${amount}! Que apoio generoso! Muito obrigado! 😄`,
    "generic_large": (amount) => `Uns impressionantes €${amount}! És uma verdadeira lenda! Muito obrigado! 🤩🦁`,
};

const donationOptions = [
    { amount: 1, display_label: "Um pequeno leão", impact: "Cada euro conta!" },
    { amount: 3, display_label: "Uma cerveja nas roloutes", impact: "Obrigado sportinguista!" },
    { amount: 5, display_label: "Uma \"refeição\" nas roloutes", impact: "És um verdadeiro leão!" },
    { amount: 9, display_label: "Com ou sem Gyokeres ", impact: "Sporting no coração!" }
    // { amount: 25, description: "Meio lugar de sócio", impact: "Leão de ouro!" }
  ];
const mockInteractionOptions = [
    {
        id: 'uuid1',
        option_name: 'Café',
        option_type: 'support_small',
        option_redirect_url: null,
        display_label: '☕',
        display_order: 1,
        value: 1,
        description: 'Desde já obrigado. SL',
    },
    {
        id: 'uuid2',
        option_name: 'És grande',
        option_type: 'support_xl',
        option_redirect_url: null,
        display_label: '📱',
        display_order: 2,
        value: 3,
        description: 'Já encomendei um',
    },
    {
        id: 'uuid3',
        option_name: 'beer',
        option_type: 'support_medium',
        option_redirect_url: null,
        display_label: '🍺',
        display_order: 3,
        value: 5,
        description: "Um brinde à cerveja e à tua doação! Se me vires no Jamor vem brindar à vida e ao Sporting 🍻",
    },
    {
        id: 'uuid4',
        option_name: 'doação_de_leão',
        option_type: 'support_xl',
        option_redirect_url: null,
        display_label: '🦁',
        display_order: 4,
        value: 9,
        description: 'Cada vez mais perto de asseguram o lugar de leão!',
    }
];

const IbanDisplayComponent = () => {
    const [showIban, setShowIban] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleToggleIban = () => {
        setShowIban(prev => !prev);
        setCopied(false); // Reset copied status when toggling
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(IBAN_NUMBER)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
            })
            .catch(err => {
                console.error("Failed to copy IBAN: ", err);
                alert("Erro ao copiar IBAN. Por favor, copie manualmente.");
            });
    };

    return (
        <div className="my-2 flex flex-col sm:flex-row items-center justify-center gap-2 w-full">
            {!showIban ? (
                <Button
                    variant="outline"
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 flex-grow sm:flex-grow-0"
                    onClick={handleToggleIban}
                >
                    <Gift size={18} className="mr-2" />
                    IBAN
                    <Gift size={18} className="ml-2" />
                </Button>
            ) : (
                <div className="flex flex-col sm:flex-row items-center gap-2 p-3 border border-primary/50 rounded-md bg-slate-50 w-full sm:w-auto justify-center">
                    <div className="flex flex-col text-center sm:text-left">
                        <span className="text-xs text-muted-foreground">IBAN para doação:</span>
                        <span className="font-mono text-sm sm:text-base text-primary font-semibold break-all">
                            {IBAN_NUMBER}
                        </span>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCopyToClipboard}
                        className="text-primary hover:bg-primary/10 p-2 rounded-full"
                        aria-label="Copiar IBAN"
                    >
                        {copied ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        ) : (
                            <Copy size={20} />
                        )}
                    </Button>
                     <Button
                        variant="outline"
                        size="sm"
                        onClick={handleToggleIban} // Button to hide IBAN again
                        className="mt-2 sm:mt-0 sm:ml-2"
                    >
                        Ocultar
                    </Button>
                </div>
            )}
        </div>
    );
};

const DonationComponent = ({
    revolutUsername = "sportingcampeao",
    tshirtImageUrl = "https://cdn-scp.azureedge.net/lojaverdeonline/0012596_camisola-principal-cpub-2526.jpeg", // Pass your t-shirt image URL as a prop
    backTshirtUrl = "https://cdn-scp.azureedge.net/lojaverdeonline/0012597_camisola-principal-cpub-2526.jpeg"
}) => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [isFrontTshirt, setIsFronttshirt] = useState(true)
    const [activeDescription, setActiveDescription] = useState({ title: '', text: '' });
    const [options, setOptions] = useState([]);
    const [thankYouMessage, setThankYouMessage] = useState('');
    const [lastActionWasItemClickWithDescription, setLastActionWasItemClickWithDescription] = useState(false);
    const [showDonationLinks, setShowDonationLinks] = useState(false)
    
    useEffect(() => {
        const sortedOptions = [...mockInteractionOptions].sort((a, b) => a.display_order - b.display_order);
        //setOptions(sortedOptions);
        setOptions(donationOptions)
    }, []);

    useEffect(() => {
        if (totalAmount === 0) {
            setThankYouMessage('');
            setActiveDescription({ title: '', text: '' });
            setShowDonationLinks(false)
            return;
        }

        const amountStr = totalAmount.toString();
        const player = playersByShirtNumber[amountStr];

        // Set Thank You Message
        if (player && playerThankYouMessages[amountStr]) {
            setThankYouMessage(playerThankYouMessages[amountStr](player.name));
        } else if (totalAmount > 0 && totalAmount < 10) {
            setThankYouMessage(playerThankYouMessages["generic_small"](totalAmount));
        } else if (totalAmount >= 10 && totalAmount < 50) {
            setThankYouMessage(playerThankYouMessages["generic_medium"](totalAmount));
        } else if (totalAmount >= 50) {
            setThankYouMessage(playerThankYouMessages["generic_large"](totalAmount));
        } else {
            setThankYouMessage('');
        }

        // Set Active Description
        if (player) {
            setActiveDescription({
                title: `${player.name} (#${player.shirtNumber})`,
                text: `Posição: ${player.position}. Um verdadeiro craque do nosso Sporting! Este apoio é digno de um Leão como tu!`
            });
        } else if (!lastActionWasItemClickWithDescription) {
            // If not a player number AND the last click wasn't an item with a description,
            // show a generic message or clear activeDescription.
            setActiveDescription({
                title: `Apoio de €${totalAmount}`,
                text: 'A tua contribuição faz a diferença. Obrigado por estares connosco!'
            });
        }
        // If it's not a player number BUT lastActionWasItemClickWithDescription is true,
        // activeDescription would have been set by handleOptionClick and we leave it.
        // Reset the flag after using it.
        if (lastActionWasItemClickWithDescription) {
            setLastActionWasItemClickWithDescription(false);
        }

    }, [totalAmount, lastActionWasItemClickWithDescription]);

    const handleOptionClick = (option) => {
        setTotalAmount(prevAmount => option.amount === 1 ? prevAmount + option.amount : option.amount);
        
        // if (option.description) {
        //     // show for different for each
        //     setActiveDescription({ title: option.option_name, text: option.description });
        // }
        // else {
        //     //now set with usestate
        //     //custom messages ofr sporintg players
        //     //setActiveDescription({ title: 'aa', text: 'aaaa' });

        // }
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

            <div className="mb-8 text-center"> {/* Adicionado text-center para melhor apresentação geral */}
  <h2 className="text-4xl font-extrabold text-emerald-700 mb-3 tracking-tight">
    <span className="block">E tu, paravas o video para apanhar a bola?</span> {/* Ou algo mais específico do vídeo */}
  </h2>
  <p className="text-xl text-slate-700 max-w-lg mx-auto">
    Mostra que és um verdadeiro Campeão e apoia o Gonçalo a comprar o seu Lugar de Leão, junto do tio João! 🦁💚
  </p>
</div>

            {activeDescription.text && (
                        <div className="p-4 rounded-lg text-left w-full border-2 border-sporting mt-4 lg:mt-0">
                            <h4 className="text-lg font-semibold text-green-700 mb-1">
                                {formatTitle(activeDescription.title)}!
                            </h4>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                {activeDescription.text}
                            </p>
                        </div>
                    )}

            {/* Thank You Message Display */}
            {thankYouMessage && (
                <div className="my-6 p-4 border-l-4 border-sporting text-green-700 rounded-md shadow">
                    <p className="font-semibold text-lg">{thankYouMessage}</p>
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-8">
                {/* Options Panel */}
                <div className="flex-1 bg-white p-5 rounded-lg">
                    {/* <h3 className="text-xl font-semibold text-sporting border-b-2 border-slate-200 pb-3 mb-4">
                    Desde já obrigado!
                    Contribui para o lugar de Leão ao pé do tio João!
                    </h3> */}
                    <div className="space-y-3 mb-4">
                        {options.map((option) => (
                            <button
                            key={option.amount}
                            onClick={() => handleOptionClick(option)}
                            className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                                totalAmount === option.amount
                                ? 'border-sporting'
                                : 'border-gray-200 hover:border-sporting'
                            }`}
                            >
                            <div className="flex justify-between items-center">
                                <div>
                                <div className="font-semibold text-sporting">€{option.amount}</div>
                                <div className="text-sm text-gray-600">{option.display_label}</div>
                                </div>
                                <div className="text-xs text-gray-500 text-right">
                                {option.impact}
                                </div>
                            </div>
                            </button>
                        ))}
                        </div>
                    {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
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
                    </div> */}

                    
                    { showDonationLinks ?
                        <>
                        <Button asChild variant="outline" className="my-2 mr-2 w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-4">
                            <a href={`https://revolut.me/${revolutUsername}/${totalAmount}EUR`} target="_blank" rel="noopener noreferrer">
                            <Gift size={18} className="mr-2 transition-colors" />
                            Revolut
                            <Gift size={18} className="mr-2 transition-colors" />
                            </a>
                        </Button>
                        <Button asChild variant="secondary" className="my-2 w-full sm:w-auto px-4 border ">
                            <a href={`https://paypal.me/glcrp`} target="_blank" rel="noopener noreferrer">
                            <Gift color='black' size={18} className="mr-2 transition-colors" />
                            Paypal
                            <Gift size={18} className="mr-2 transition-colors" />
                            </a>
                        </Button>
                        <IbanDisplayComponent />
                        </>
                     : totalAmount > 0 ? <button
                     onClick={() => setShowDonationLinks(true)}
                     disabled={!totalAmount}
                     className="mt-3 w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-4 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                     >
                     <div className="flex items-center justify-center">
                         <Euro className="w-5 h-5 mr-2" />
                         {totalAmount ? 
                         `Como posso contribuir?` : 
                         'Seleciona um valor'
                         }
                     </div>
                 </button>
                    : null}
                    
                </div>

                {/* Display Panel */}
                {totalAmount > 0 && (
                    <div className="flex-1 flex flex-col items-center gap-5">
                    {/* T-Shirt Display with Real Image */}
                    <div className="text-center w-full max-w-[360px] xl:max-w-[300px] mx-auto mt-6"> {/* Control max width of T-shirt display */}
                        <div className="relative w-full"> {/* Parent for positioning, takes full width of its constrained parent */}
                            <img
                                src={isFrontTshirt ? tshirtImageUrl : backTshirtUrl}
                                alt="Support T-Shirt"
                                className="w-full h-auto object-contain rounded-md" // Image scales, maintains aspect ratio
                            />
                            {totalAmount > 0 && !isFrontTshirt ? (
                                <>
                                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span className="text-4xl font-bold text-primary p-2 rounded-md whitespace-nowrap">
                                        {totalAmount}
                                    </span>
                                </div>
                                <div onClick={() => handleDonate(true)} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <Button asChild variant="ghost" className="w-full sm:w-auto text-primary-foreground px-4">
                                        <ShoppingBag size={18} className="mr-2 text-sporting group-hover:text-amber-500 transition-colors" />
                                    </Button>
                                </div>
                                <div onClick={() => setIsFronttshirt(!isFrontTshirt)} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
                                <div onClick={() => {setTotalAmount(totalAmount -1); setActiveDescription({title: '', text: ''})}} className="absolute bottom-0 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                                    <div className="flex-1">
                                        <button
                                            className={clsx(
                                                'group flex items-center gap-1.5 pr-1.5 transition-[color]',
                                            )}
                                        >
                                            <div className="relative before:absolute before:-inset-2.5 before:rounded-full before:transition-[background-color] before:group-hover:bg-sporting/30">
                                                <MinusIcon
                                                    color='green'
                                                    absoluteStrokeWidth
                                                    className={'~size-4/5 group-active:spring-duration-[25] spring-bounce-[65] spring-duration-300 transition-transform group-active:scale-[80%]'
                                                    }
                                                />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div onClick={() => {setTotalAmount(totalAmount +1); setActiveDescription({title: '', text: ''})}} className="absolute bottom-0 left-3/4 transform -translate-x-1/2 -translate-y-1/2">
                                    <div className="flex-1">
                                        <button
                                            className={clsx(
                                                'group flex items-center gap-1.5 pr-1.5 transition-[color]',
                                            )}
                                        >
                                            <div className="relative before:absolute before:-inset-2.5 before:rounded-full before:transition-[background-color] before:group-hover:bg-sporting/30">
                                                <PlusIcon
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
                                <div onClick={() => setIsFronttshirt(!isFrontTshirt)} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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

            {/* <Button asChild variant="outline" className="mt-4 w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-4">
                        <a href={`https://revolut.me/${revolutUsername}/${totalAmount}EUR/💚🤍❤️`} target="_blank" rel="noopener noreferrer">
                            <Gift size={18} className="transition-colors" />
                            Revolut do Leão
                        </a>
                        </Button> */}

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