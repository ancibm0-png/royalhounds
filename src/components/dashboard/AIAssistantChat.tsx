import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';

const AIAssistantChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          "👋 Hello! I'm STORIUM AI, your decentralized storage assistant. I can help you understand how STORIUM protects your data with blockchain and IPFS. Ask about our features, security, or how we differ from Google Drive or Filecoin!"
        );
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (text) => {
    setMessages((prev) => [...prev, { type: 'bot', text, timestamp: Date.now() }]);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { type: 'user', text, timestamp: Date.now() }]);
  };

  const getAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // General Introduction and Problem Statement
    if (message.includes('what is storium') || message.includes('about storium') || message.includes('overview') || message.includes('introduction')) {
      return "🌟 STORIUM is a decentralized cloud storage platform built on Ethereum blockchain and IPFS. Unlike centralized services like Google Drive or Dropbox, which can be hacked, censor content, or lock you out, STORIUM gives you true ownership, permanent storage, and censorship resistance. With over 1 billion records breached in 2024 and a 30% spike in censorship, STORIUM empowers you with Web3 security and a sleek, intuitive app.";
    }
    if (message.includes('decentralized storage') || message.includes('centralized') || message.includes('big tech') || message.includes('google drive') || message.includes('dropbox') || message.includes('why decentralized')) {
      return "⚠️ Centralized clouds like Google Drive or Dropbox risk data breaches (1B+ records in 2024) and censorship (30% spike). They control your data, can raise prices, or lock you out. STORIUM uses Ethereum and IPFS for true ownership, immutability, and protection—no middlemen, just your data, your control.";
    }
    if (message.includes('data breaches') || message.includes('scale of breaches')) {
      return "📊 In 2024, data breaches exposed over 1 billion records worldwide, highlighting the vulnerability of centralized storage. STORIUM’s decentralized approach using Ethereum and IPFS ensures your data is secure, immutable, and free from single-point failures.";
    }
    if (message.includes('censorship resistance') || message.includes('censorship incidents')) {
      return "🚫 Censorship incidents on major platforms spiked by 30% in 2024. STORIUM’s IPFS-based storage ensures no authority can block or delete your files, while Ethereum smart contracts provide transparent, user-controlled access.";
    }
    if (message.includes('data ownership') || message.includes('web3 empowerment')) {
      return "🔑 STORIUM empowers you with true data ownership via Ethereum wallet-based access and IPFS’s distributed storage. Unlike centralized clouds, you control your files without relying on third parties, aligning with Web3’s trustless principles.";
    }

    // Blockchain and Technical Concepts
    if (message.includes('what is blockchain') || message.includes('blockchain')) {
      return "🔗 Blockchain is a decentralized, distributed digital ledger technology that records transactions across a network of computers in a secure, transparent, and immutable way. At its core, it functions like a shared database where data is stored in chronological 'blocks' linked together in a 'chain' using cryptographic hashes, ensuring that once information is added, it cannot be altered retroactively without consensus from the network. This structure eliminates the need for intermediaries like banks or central authorities, making it resistant to tampering, fraud, and single points of failure.\n\n**How it works**: \n1) A user initiates a transaction, which is broadcast to the network.\n2) Nodes verify it using consensus mechanisms like Proof-of-Work or Proof-of-Stake.\n3) Valid transactions are grouped into a block with a timestamp and a cryptographic hash of the previous block.\n4) The block is added to the chain and distributed to all nodes.\n5) Cryptography ensures immutability.\n\n**Types**: Public (e.g., Bitcoin), private, consortium, or hybrid.\n**Benefits**: Security, transparency, efficiency.\n**Challenges**: Scalability, energy use, regulation.\n**Applications**: Cryptocurrencies, supply chain, healthcare, voting.\nBy 2032, the blockchain market may reach $1 trillion. In STORIUM, Ethereum’s blockchain manages file metadata and access control securely.";
    }
    if (message.includes('ethereum') || message.includes('how ethereum works')) {
      return "🌐 Ethereum is a decentralized blockchain platform that runs smart contracts. In STORIUM, it powers the GlobalStorage contract on Sepolia testnet, handling file metadata, ownership, and permissions with low-cost, secure transactions.";
    }
    if (message.includes('smart contract') || message.includes('what is solidity')) {
      return "📜 A smart contract is a self-executing program on a blockchain. STORIUM’s GlobalStorage.sol, written in Solidity, manages file metadata and access control. Solidity is a programming language for Ethereum smart contracts, ensuring secure and transparent operations.";
    }
    if (message.includes('decentralized network')) {
      return "🌍 A decentralized network distributes data across many nodes, not a single server. STORIUM uses IPFS for file storage and Ethereum for metadata, ensuring no central authority can control or censor your data.";
    }
    if (message.includes('ipfs') || message.includes('interplanetary file system')) {
      return "📁 IPFS (InterPlanetary File System) is a peer-to-peer protocol for storing and sharing files across a distributed network. STORIUM uses IPFS to store files permanently, with each file assigned a unique CID for global access.";
    }
    if (message.includes('cid') || message.includes('content identifier')) {
      return "🔍 A Content Identifier (CID) is a unique hash for files on IPFS, generated from their content. In STORIUM, CIDs ensure files are uniquely addressable and retrievable from any IPFS node, guaranteeing permanence.";
    }
    if (message.includes('cryptographic hash')) {
      return "🔒 A cryptographic hash is a fixed-length string generated from data, unique to its content. In STORIUM, IPFS uses hashes (CIDs) to identify files, ensuring integrity and enabling distributed retrieval.";
    }
    if (message.includes('sepolia') || message.includes('testnet')) {
      return "🌐 Sepolia is an Ethereum testnet (Chain ID: 11155111) for development, using free test ETH. STORIUM runs on Sepolia to test smart contracts and interactions, ensuring low-cost experimentation before mainnet or Layer 2 deployment.";
    }
    if (message.includes('testnet faucet')) {
      return "💧 A testnet faucet provides free test ETH for networks like Sepolia. For STORIUM, use faucets like sepoliafaucet.com to get test ETH for transactions on the Sepolia testnet.";
    }
    if (message.includes('gas fees') || message.includes('transaction cost')) {
      return "⛽ Gas fees are payments for Ethereum transactions. In STORIUM on Sepolia, actions like uploading or granting access cost ~0.001-0.005 ETH (free test ETH). Future Layer 2 integration (Polygon, Arbitrum) will reduce fees to sub-cents.";
    }
    if (message.includes('layer 2') || message.includes('polygon') || message.includes('arbitrum')) {
      return "🚀 Layer 2 solutions like Polygon or Arbitrum scale Ethereum by processing transactions off-chain with lower fees, settling on mainnet. STORIUM plans to integrate them to make actions like uploads cost fractions of a cent.";
    }
    if (message.includes('wallet address') || message.includes('metamask')) {
      return "🦊 A wallet address is a unique identifier for your Ethereum account. STORIUM uses MetaMask, a browser extension wallet, to connect to Sepolia, sign transactions, and prove ownership securely.";
    }
    if (message.includes('private key') || message.includes('seed phrase')) {
      return "🔐 A private key is a secret code for your Ethereum wallet, and the seed phrase is a 12-24 word backup. In STORIUM, keep them secure—losing them means losing access to your files, as it’s fully decentralized.";
    }
    if (message.includes('decentralized application') || message.includes('dapp')) {
      return "🌐 A DApp is a decentralized app running on a blockchain. STORIUM is a DApp using Ethereum for access control and IPFS for storage, offering a user-friendly interface with Web3 security.";
    }
    if (message.includes('ethers.js')) {
      return "📚 Ethers.js is a JavaScript library for interacting with Ethereum. In STORIUM, it connects the React frontend to the GlobalStorage contract, enabling actions like uploading files or managing permissions.";
    }
    if (message.includes('smart contract mapping') || message.includes('struct')) {
      return "🗂️ In STORIUM’s Solidity contract, mappings (like ownership[owner][user]) track permissions, and structs (like FileInfo) store metadata like name, CID, and size. They ensure efficient, secure data management on-chain.";
    }
    if (message.includes('event in smart contract')) {
      return "📢 Smart contract events log actions on the blockchain. STORIUM’s contract emits events like FileUploaded or AccessGranted for transparency, allowing tracking of uploads and permission changes.";
    }
    if (message.includes('reentrancy') || message.includes('contract exploits')) {
      return "🛡️ Reentrancy is an attack where a contract is called repeatedly before finishing. STORIUM’s contract avoids this with input validation and no complex loops, tested via Remix to ensure security.";
    }
    if (message.includes('gpl-3.0') || message.includes('license')) {
      return "📜 STORIUM is open-source under the GPL-3.0 license, allowing anyone to view, use, or modify the code while ensuring derivative works remain open-source.";
    }
    if (message.includes('web3')) {
      return "🌐 Web3 is the decentralized internet powered by blockchain. STORIUM bridges Web2 usability (sleek UI, easy navigation) with Web3 security (Ethereum ownership, IPFS storage) for user-friendly decentralized storage.";
    }

    // IPFS and Storage Mechanics
    if (message.includes('ipfs store') || message.includes('distributed storage')) {
      return "📁 IPFS stores files across a network of nodes, not a single server. STORIUM uploads files to IPFS via Pinata, ensuring permanence and global access with no central point of failure.";
    }
    if (message.includes('censorship-resistant') || message.includes('ipfs censorship')) {
      return "🚫 IPFS’s distributed nature makes STORIUM censorship-resistant. Files are stored across many nodes, so no single entity can block or delete them, ensuring free access.";
    }
    if (message.includes('file pinning') || message.includes('pinata')) {
      return "📌 Pinning ensures IPFS files stay available. STORIUM uses Pinata as a pinning gateway for reliability, but files remain accessible via other gateways like ipfs.io if Pinata is unavailable.";
    }
    if (message.includes('ipfs gateway') || message.includes('other gateways')) {
      return "🌐 An IPFS gateway (e.g., Pinata, ipfs.io) retrieves files by their CID. If Pinata goes down, STORIUM users can access files via other gateways, ensuring redundancy.";
    }
    if (message.includes('file permanence') || message.includes('files live forever')) {
      return "🔄 IPFS ensures permanence by replicating files across nodes. STORIUM pins files via Pinata, and as long as one node holds the file, it’s accessible via its CID.";
    }
    if (message.includes('ipfs nodes offline') || message.includes('nodes go offline')) {
      return "🌍 If some IPFS nodes go offline, files remain accessible as long as one node holds the data. STORIUM’s use of Pinata ensures pinning, and future multi-provider clustering will enhance redundancy.";
    }
    if (message.includes('file replication') || message.includes('replicated in ipfs')) {
      return "🔄 IPFS replicates files across nodes based on demand and pinning. STORIUM uses Pinata to pin files, ensuring they’re available globally, with plans for multi-provider support.";
    }
    if (message.includes('ipfs cost') || message.includes('storage cost') || message.includes('free storage')) {
      return "💾 IPFS storage is free, but Pinata pinning ensures persistence (free tier for small usage). STORIUM users pay gas (~0.001 ETH) for metadata, not storage—no recurring fees like AWS.";
    }
    if (message.includes('large files') || message.includes('file size')) {
      return "📦 STORIUM supports large files, recommending <100MB for fast uploads (~20s for 50MB). IPFS handles larger files, but gas costs for metadata are optimized for efficiency.";
    }
    if (message.includes('file types') || message.includes('classify file types')) {
      return "📋 STORIUM supports all file types (images, videos, documents, audio). The frontend uses extensions (e.g., .jpg for images) for previews and categorization, with no contract limits.";
    }

    // Smart Contract and Access Control
    if (message.includes('globalstorage') || message.includes('smart contract work')) {
      return "📜 GlobalStorage.sol on Sepolia manages file metadata and access. It uses FileInfo structs (name, CID, size) and Access structs for permissions, with functions like addFile, allow, and getMyFiles.";
    }
    if (message.includes('metadata') || message.includes('file metadata')) {
      return "📊 STORIUM’s contract stores metadata like file name, CID, type, size, and timestamp in FileInfo structs. This ensures efficient on-chain management while files live on IPFS.";
    }
    if (message.includes('key functions') || message.includes('contract functions')) {
      return "🔧 Key functions in GlobalStorage.sol: addFile (uploads metadata), allow/disallow (manage permissions), deleteFile (removes metadata), getMyFiles (lists owned files), getPublicFiles (lists public files).";
    }
    if (message.includes('addfile') || message.includes('upload function')) {
      return "⬆️ The addFile function in STORIUM’s contract stores file metadata (name, CID, size) on-chain, emits a FileUploaded event, and links to IPFS. It’s called during uploads, costing ~0.001 ETH.";
    }
    if (message.includes('allow function') || message.includes('disallow function')) {
      return "🤝 The allow function grants access to a wallet address, updating the ownership mapping. The disallow function revokes it. Both are instant, on-chain, and emit AccessGranted/Revoked events.";
    }
    if (message.includes('getmyfiles') || message.includes('getpublicfiles')) {
      return "📂 getMyFiles returns files owned or accessible by msg.sender. getPublicFiles lists all public files in the Public Explorer. Both use on-chain mappings for secure, transparent access.";
    }
    if (message.includes('access control') || message.includes('unauthorized access')) {
      return "🔒 STORIUM’s contract uses ownership[owner][user] mappings to track permissions. Functions like getUserFiles verify msg.sender, preventing unauthorized access. Input validation ensures security.";
    }
    if (message.includes('input validation') || message.includes('validate inputs')) {
      return "🛡️ The contract validates inputs (e.g., no empty CIDs or zero sizes) to prevent errors or attacks. This ensures only valid metadata is stored, tested via Remix simulations.";
    }
    if (message.includes('contract events') || message.includes('emitted events')) {
      return "📢 STORIUM’s contract emits events like FileUploaded, AccessGranted, and AccessRevoked for transparency. These log actions on-chain, enabling auditing and tracking.";
    }
    if (message.includes('file deletion') || message.includes('delete file')) {
      return "🗑️ Only owners can delete files via deleteFile, which removes metadata from the contract. IPFS files may persist if pinned elsewhere, aligning with immutability. Confirmation prompts prevent errors.";
    }

    // Features and Functionality
    if (message.includes('upload a file') || message.includes('how to upload')) {
      return "⬆️ Upload: 1) Connect MetaMask to Sepolia, 2) Go to Upload tab, 3) Drag/drop or select file, 4) Add description/tags, 5) Set public/private, 6) Deploy to IPFS and Ethereum. Gas: ~0.001 ETH.";
    }
    if (message.includes('public files') || message.includes('private files') || message.includes('visibility')) {
      return "🌐 Public files are listed in Public Explorer via getPublicFiles for sharing. Private files are restricted to owners or authorized wallets, verified on-chain. Set visibility during upload.";
    }
    if (message.includes('grant access') || message.includes('revoke access') || message.includes('sharing')) {
      return "🤝 Share files: 1) Use Share tab to allow/disallow access to all files, 2) Select specific files in File Manager. Permissions update instantly on-chain, only for authorized wallets.";
    }
    if (message.includes('public explorer')) {
      return "🌍 Public Explorer displays all public files via getPublicFiles. Users can browse, view, or download community-shared files, fostering collaboration while keeping private files secure.";
    }
    if (message.includes('file search') || message.includes('filters') || message.includes('sort')) {
      return "🔍 Search files by name, filter by type (image, video, etc.), or sort by date/size/name in File Manager. Tags added during upload aid organization, with real-time previews for ease.";
    }
    if (message.includes('download file') || message.includes('access file') || message.includes('retrieve')) {
      return "⬇️ Download/view: 1) In File Manager or Public Explorer, 2) Click for preview (e.g., images) or download, 3) Files are fetched via IPFS gateway (e.g., https://gateway.pinata.cloud/ipfs/<CID>).";
    }
    if (message.includes('supported file types') || message.includes('file formats')) {
      return "📋 STORIUM supports images (JPG, PNG, GIF with previews), documents (PDF, TXT), videos (MP4, AVI), audio (MP3, WAV), and more. Extensions categorize files for previews.";
    }
    if (message.includes('real-time previews') || message.includes('file previews')) {
      return "🖼️ Real-time previews show thumbnails for images or metadata for other files in File Manager. The React frontend uses extensions to render previews, enhancing user experience.";
    }

    // Security and Benefits
    if (message.includes('secure') || message.includes('security') || message.includes('phishing')) {
      return "🔒 STORIUM’s security: 1) Wallet-based ownership, 2) IPFS distribution, 3) Immutable Ethereum records, 4) MetaMask signatures, 5) Contract validation. We educate on testnet faucets to avoid phishing.";
    }
    if (message.includes('immutability') || message.includes('tamper-proof')) {
      return "🔄 Immutability means files and metadata can’t be altered once stored. STORIUM uses IPFS for permanent files and Ethereum for tamper-proof access logs, ensuring data integrity.";
    }
    if (message.includes('lose wallet') || message.includes('lose access') || message.includes('wallet recovery')) {
      return "🔐 Losing your wallet means losing access, as STORIUM is fully decentralized with no central recovery. Backup your seed phrase. IPFS files are still accessible if you know the CID.";
    }
    if (message.includes('filecoin') || message.includes('arweave') || message.includes('sia') || message.includes('unique')) {
      return "🌟 STORIUM stands out with Ethereum-based access control, a polished React UI, and features like previews and search. Unlike Filecoin, Sia, or Arweave, we prioritize Web2 usability with Web3 security.";
    }
    if (message.includes('benefits') || message.includes('advantage') || message.includes('pros')) {
      return "✨ STORIUM offers: 1) True ownership, 2) Permanent IPFS storage, 3) Censorship resistance, 4) Global access, 5) Transparent permissions, 6) No subscriptions—just gas fees.";
    }
    if (message.includes('creators') || message.includes('journalists') || message.includes('businesses')) {
      return "🌍 STORIUM empowers creators (NFT storage), journalists (secure archives in censored areas), and businesses (private backups) with decentralized, censorship-resistant storage and Web2-like usability.";
    }

    // UI and Design
    if (message.includes('theme') || message.includes('ui') || message.includes('design') || message.includes('glassmorphism')) {
      return "🎨 STORIUM’s UI features a yellow-black theme with gold accents (#ffd700), glassmorphism (blurred panels), custom cursor animations, and responsive design for mobile/desktop.";
    }
    if (message.includes('cursor animations') || message.includes('custom cursor')) {
      return "🖱️ STORIUM’s custom cursor features wave animations on hover, enhancing UX. Built with CSS and JavaScript, it adds a dynamic, modern feel to the React frontend.";
    }
    if (message.includes('mobile-responsive') || message.includes('responsive design')) {
      return "📱 STORIUM’s UI is fully responsive, adapting to mobile and desktop with smooth animations and layouts, ensuring seamless file management on any device.";
    }

    // Future and Business
    if (message.includes('roadmap') || message.includes('future') || message.includes('enhancements')) {
      return "🚀 Roadmap: 1) Client-side encryption, 2) Folder organization, 3) Layer 2 (Polygon, Arbitrum) for low fees, 4) File versioning, 5) Multi-chain support (e.g., BSC) to scale STORIUM.";
    }
    if (message.includes('client-side encryption') || message.includes('encryption')) {
      return "🔐 Client-side encryption (planned) will encrypt files before IPFS upload, ensuring end-to-end privacy even if CIDs are exposed, enhancing STORIUM’s security.";
    }
    if (message.includes('file versioning')) {
      return "📝 File versioning (planned) will track file changes on STORIUM, ideal for collaborative projects or document management, stored efficiently on IPFS and Ethereum.";
    }
    if (message.includes('multi-chain') || message.includes('other chains')) {
      return "🌐 Multi-chain support (planned) will add chains like Binance Smart Chain to STORIUM, increasing accessibility and reducing costs while maintaining Ethereum’s security.";
    }
    if (message.includes('business model') || message.includes('monetize') || message.includes('funding')) {
      return "💼 STORIUM is open-source (GPL-3.0). Future monetization includes premium features (e.g., enhanced pinning) via tokens and DAO/NFT marketplace partnerships. Funding will scale development.";
    }
    if (message.includes('nft marketplaces') || message.includes('integrate with nft')) {
      return "🖼️ STORIUM can power NFT marketplaces by storing media files on IPFS with Ethereum-based access control, ensuring secure, permanent, and decentralized storage for digital assets.";
    }

    // Technical Setup and Troubleshooting
    if (message.includes('set up metamask') || message.includes('connect wallet')) {
      return "🦊 MetaMask setup: 1) Install from metamask.io, 2) Create/import wallet, 3) Switch to Sepolia (Chain ID: 11155111), 4) Get test ETH from sepoliafaucet.com, 5) Connect via STORIUM.";
    }
    if (message.includes('test eth') || message.includes('sepolia faucet')) {
      return "💧 Get test ETH for Sepolia from faucets like sepoliafaucet.com. Use it to pay gas fees (~0.001 ETH) for STORIUM actions like uploading or granting access.";
    }
    if (message.includes('chain id') || message.includes('sepolia chain id')) {
      return "🔗 Sepolia’s Chain ID is 11155111. STORIUM uses it for testing on the Ethereum testnet, ensuring low-cost transactions with free test ETH.";
    }
    if (message.includes('troubleshoot') || message.includes('error') || message.includes('not working')) {
      return "🔧 Troubleshoot: 1) Check MetaMask is on Sepolia with test ETH, 2) Verify Pinata keys, 3) Refresh wallet connection, 4) Use Chrome/Firefox, 5) Check console. Run 'npm run dev' locally.";
    }
    if (message.includes('deploy contract') || message.includes('remix')) {
      return "🚀 Deploy: 1) Open remix.ethereum.org, 2) Paste GlobalStorage.sol, 3) Compile with Solidity 0.8.x, 4) Connect MetaMask to Sepolia, 5) Deploy, 6) Update App.jsx with address.";
    }
    if (message.includes('contribute') || message.includes('development')) {
      return "🤝 Contribute: 1) Fork repo, 2) Create feature branch, 3) Test on Sepolia, 4) Use ESLint/Prettier, 5) Submit PR. Add features like encryption or Layer 2 under GPL-3.0.";
    }
    if (message.includes('run locally') || message.includes('npm run dev')) {
      return "💻 Run STORIUM locally: 1) Clone repo, 2) Run 'npm install', 3) Add Pinata keys to .env, 4) Run 'npm run dev', 5) Access at http://localhost:3000 with MetaMask on Sepolia.";
    }

    // Default Response
    return "🔗 Blockchain is a decentralized, distributed digital ledger technology that records transactions across a network of computers in a secure, transparent, and immutable way. At its core, it functions like a shared database where data is stored in chronological 'blocks' linked together in a 'chain' using cryptographic hashes, ensuring that once information is added, it cannot be altered retroactively without consensus from the network. This eliminates intermediaries like banks, making it resistant to tampering and fraud.\n\n**How it works**: \n1) A user initiates a transaction, broadcast to the network.\n2) Nodes verify it using consensus like Proof-of-Work or Proof-of-Stake.\n3) Valid transactions form a block with a timestamp and hash of the previous block.\n4) The block is added to the chain and synced across nodes.\n5) Cryptography ensures immutability.\n\n**Types**: Public (e.g., Bitcoin), private, consortium, or hybrid.\n**Benefits**: Security, transparency, efficiency.\n**Challenges**: Scalability, energy use, regulation.\n**Applications**: Cryptocurrencies, supply chain, healthcare, voting.\nBy 2032, the blockchain market may reach $1 trillion. In STORIUM, Ethereum’s blockchain manages file metadata and access control securely.\n\nAsk more about STORIUM’s features, security, or how we compare to centralized clouds!";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    addUserMessage(userMessage);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = getAIResponse(userMessage);
      addBotMessage(response);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question) => {
    addUserMessage(question);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = getAIResponse(question);
      addBotMessage(response);
    }, 800);
  };

  const quickQuestions = [
    'What is STORIUM?',
    'Why choose decentralized over Google Drive?',
    'How do I upload files?',
    'How does access control work?',
    'What makes STORIUM unique?',
    'What is the roadmap?',
    'How do I set up MetaMask?',
  ];

  return (
    <div className="chatbot-container">
      <button className={`chatbot-toggle ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '🤖'}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-avatar">🤖</div>
            <div className="chatbot-info">
              <h3>STORIUM AI</h3>
              <div className="chatbot-status">
                <div className="status-dot"></div>
                Online & Ready to Help
              </div>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                <div className={`message-avatar ${message.type}`}>{message.type === 'bot' ? '🤖' : '👤'}</div>
                <div className={`message-content ${message.type}`}>{message.text}</div>
              </div>
            ))}

            {isTyping && (
              <div className="message bot">
                <div className="message-avatar bot">🤖</div>
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className="quick-questions">
                <p style={{ color: '#ffd700', fontSize: '0.8rem', marginBottom: '8px' }}>
                  💡 Quick questions to get started:
                </p>
                {quickQuestions.map((question, index) => (
                  <button key={index} className="quick-question" onClick={() => handleQuickQuestion(question)}>
                    {question}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <div className="input-container">
              <textarea
                className="message-input"
                placeholder="Ask about STORIUM’s features, security, or how we compare to centralized clouds..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
                rows={1}
              />
              <button className="send-button" onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistantChat;
