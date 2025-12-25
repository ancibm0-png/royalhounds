import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FileText, Building2, Calendar, Shield, ExternalLink, Share2, History } from 'lucide-react';
import { Credential } from '../types/credential';

interface Credential3DCardProps {
  credential: Credential;
  index: number;
  totalCards: number;
  onViewDocument: () => void;
  onShare: () => void;
  onViewHistory: () => void;
  isStacked?: boolean;
}

export default function Credential3DCard({
  credential,
  index,
  totalCards,
  onViewDocument,
  onShare,
  onViewHistory,
  isStacked = false
}: Credential3DCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isStacked) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const stackOffset = isStacked ? {
    y: index * -8,
    z: -index * 20,
    scale: 1 - (index * 0.05),
    opacity: 1 - (index * 0.15)
  } : {};

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      style={{
        perspective: '1000px',
        ...stackOffset
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-[400px] cursor-pointer"
        style={{
          rotateX: isStacked ? 0 : rotateX,
          rotateY: isStacked ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
        onClick={() => !isStacked && setIsFlipped(!isFlipped)}
      >
        {/* Front Face */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl"
          style={{
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Dark Web3 Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#111] via-[#0d0d0d] to-black opacity-95">
            <div
              className="absolute inset-0"
              style={{
                background: `
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(255, 199, 0, 0.04) 2px,
                    rgba(255, 199, 0, 0.04) 4px
                  ),
                  repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 2px,
                    rgba(255, 199, 0, 0.04) 2px,
                    rgba(255, 199, 0, 0.04) 4px
                  )
                `
              }}
            />
          </div>

          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 opacity-25"
            style={{
              background:
                'linear-gradient(110deg, transparent 0%, transparent 40%, rgba(255,199,0,0.6) 50%, transparent 60%, transparent 100%)',
            }}
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 2
            }}
          />

          {/* Content */}
          <div className="relative h-full p-8 flex flex-col justify-between text-white">
            <div>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-xl"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FileText className="w-8 h-8 text-yellow-400" />
                  </motion.div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Verified Credential
                    </div>
                    <div className="text-sm font-mono text-gray-500">
                      #{credential.tokenId}
                    </div>
                  </div>
                </div>
                {credential.revoked ? (
                  <div className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full shadow-lg">
                    REVOKED
                  </div>
                ) : (
                  <motion.div
                    className="p-2 bg-yellow-400/10 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Shield className="w-5 h-5 text-yellow-400" />
                  </motion.div>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold leading-tight line-clamp-2">
                  {credential.degree}
                </h3>
                <div className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  <span className="text-lg font-medium line-clamp-1">
                    {credential.institution}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Issued: {formatDate(credential.issueDate)}</span>
              </div>

              <div className="h-12 rounded-lg bg-gradient-to-r from-yellow-400/20 via-yellow-300/10 to-yellow-400/20 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                  Blockchain Verified
                </span>
              </div>

              <div className="text-xs text-center text-gray-500">
                Click to flip • Hover to rotate
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back Face */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#111] to-black"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="relative h-full p-8 flex flex-col justify-between text-white">
            <div>
              <h4 className="text-xl font-bold mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-yellow-400" />
                Credential Details
              </h4>

              <div className="space-y-4">
                <div className="p-4 bg-white/5 border border-[#1f1f1f] rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Token ID</div>
                  <div className="text-sm font-mono">{credential.tokenId}</div>
                </div>

                <div className="p-4 bg-white/5 border border-[#1f1f1f] rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">IPFS Hash</div>
                  <div className="text-sm font-mono break-all">
                    {credential.ipfsHash.slice(0, 20)}...{credential.ipfsHash.slice(-10)}
                  </div>
                </div>

                <div className="p-4 bg-white/5 border border-[#1f1f1f] rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Student Address</div>
                  <div className="text-sm font-mono break-all">
                    {credential.student.slice(0, 10)}...{credential.student.slice(-8)}
                  </div>
                </div>

                <div className="p-4 bg-white/5 border border-[#1f1f1f] rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Status</div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${credential.revoked ? 'bg-red-500' : 'bg-yellow-400'} animate-pulse`} />
                    <div className="text-sm font-semibold">
                      {credential.revoked ? 'Revoked' : 'Active & Verified'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDocument();
                }}
                className="w-full py-3 bg-yellow-400 text-black hover:bg-yellow-300 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Document
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onShare();
                  }}
                  className="py-2 bg-[#111] border border-[#1f1f1f] hover:border-yellow-400 rounded-lg font-medium transition-colors flex items-center justify-center text-sm"
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewHistory();
                  }}
                  className="py-2 bg-[#111] border border-[#1f1f1f] hover:border-yellow-400 rounded-lg font-medium transition-colors flex items-center justify-center text-sm"
                >
                  <History className="w-4 h-4 mr-1" />
                  History
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
