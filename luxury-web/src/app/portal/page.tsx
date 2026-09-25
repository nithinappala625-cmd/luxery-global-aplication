'use client';

import { useState, useEffect } from 'react';
import {
  Shield,
  Plane,
  Anchor,
  Watch,
  Gem,
  PlusCircle,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  FileCheck2,
  Users,
  Building2,
  UserCheck,
  AlertCircle,
  ArrowRight,
  Upload,
} from 'lucide-react';
import {
  BookingRequest,
  getBookingRequests,
  updateBookingStatus,
  CustomUploadedAsset,
  getCustomListings,
  saveCustomListing,
  INITIAL_BROKERS,
  BrokerOrOwnerProfile,
} from '@/lib/bookings';
import Link from 'next/link';

export default function OwnerBrokerPortalPage() {
  const [activeTab, setActiveTab] = useState<'requests' | 'upload' | 'directory' | 'guidelines'>('requests');
  const [activeBroker, setActiveBroker] = useState<BrokerOrOwnerProfile>(INITIAL_BROKERS[0]);
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);
  const [customListings, setCustomListings] = useState<CustomUploadedAsset[]>([]);
  const [filterCategory, setFilterCategory] = useState<'all' | 'aviation' | 'marine'>('all');

  // Quotation / Assign Modal State
  const [selectedReqForQuote, setSelectedReqForQuote] = useState<BookingRequest | null>(null);
  const [quoteAmount, setQuoteAmount] = useState('');
  const [assignedAssetName, setAssignedAssetName] = useState('');

  // New Asset Upload Form State
  const [newAsset, setNewAsset] = useState({
    category: 'aviation' as CustomUploadedAsset['category'],
    subCategory: 'Private Jets',
    title: '',
    model: '',
    manufacturer: '',
    year: '2023',
    priceOrRate: '',
    listingMode: 'charter' as CustomUploadedAsset['listingMode'],
    engines: '',
    flyingHours: '',
    speed: '',
    range: '',
    seatingCapacity: 8,
    loa: '',
    cabins: '',
    carat: '',
    allowedUses: ['Executive Travel', 'Weddings', 'Flower Showers'],
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop',
    videoUrl: '',
    sellerName: activeBroker.name,
    sellerType: activeBroker.type,
    sellerLocation: activeBroker.location,
    sellerPhone: activeBroker.phone,
    sellerEmail: activeBroker.email,
  });

  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    setBookingRequests(getBookingRequests());
    setCustomListings(getCustomListings());

    const handleBookingAdded = (e: any) => {
      setBookingRequests(getBookingRequests());
    };
    const handleBookingUpdated = (e: any) => {
      setBookingRequests(getBookingRequests());
    };
    const handleListingAdded = (e: any) => {
      setCustomListings(getCustomListings());
    };

    window.addEventListener('npgroups_booking_added', handleBookingAdded);
    window.addEventListener('npgroups_booking_updated', handleBookingUpdated);
    window.addEventListener('npgroups_listing_added', handleListingAdded);

    return () => {
      window.removeEventListener('npgroups_booking_added', handleBookingAdded);
      window.removeEventListener('npgroups_booking_updated', handleBookingUpdated);
      window.removeEventListener('npgroups_listing_added', handleListingAdded);
    };
  }, []);

  const handleUpdateStatus = (
    reqId: string,
    status: BookingRequest['status'],
    assignedAsset?: string,
    quotation?: string
  ) => {
    const updated = updateBookingStatus(reqId, status, assignedAsset, activeBroker.name, quotation);
    setBookingRequests(updated);
    setSelectedReqForQuote(null);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveCustomListing({
      category: newAsset.category,
      subCategory: newAsset.subCategory,
      title: newAsset.title,
      model: newAsset.model,
      manufacturer: newAsset.manufacturer,
      year: newAsset.year,
      priceOrRate: newAsset.priceOrRate,
      listingMode: newAsset.listingMode,
      specs: {
        engines: newAsset.engines,
        flyingHours: newAsset.flyingHours,
        speed: newAsset.speed,
        range: newAsset.range,
        seatingCapacity: Number(newAsset.seatingCapacity),
        loa: newAsset.loa,
        cabins: newAsset.cabins,
        carat: newAsset.carat,
      },
      allowedUses: newAsset.allowedUses,
      imageUrl: newAsset.imageUrl,
      videoUrl: newAsset.videoUrl,
      sellerName: activeBroker.name,
      sellerType: activeBroker.type,
      sellerLocation: activeBroker.location,
      sellerPhone: activeBroker.phone,
      sellerEmail: activeBroker.email,
    });
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 4000);
    setNewAsset({
      ...newAsset,
      title: '',
      model: '',
      manufacturer: '',
      priceOrRate: '',
    });
  };

  const filteredRequests = bookingRequests.filter((req) => {
    if (filterCategory === 'all') return true;
    return req.category === filterCategory;
  });

  return (
    <div className="bg-[#FCFBF7] text-[#080B09] min-h-screen pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Navigation Breadcrumb */}
        <div className="py-6 border-b border-[#D8D3C8] mb-8 flex items-center justify-between text-xs flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#080B09]/70 hover:text-[#061C16] uppercase tracking-[0.25em] font-medium transition-colors"
          >
            <span>&larr; BACK TO NP GROUPS NETWORK</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#9D7B3E] font-medium">
              VERIFIED OWNER &amp; BROKER ACCESS &middot; ENCRYPTED CLIENT DOSSIERS
            </span>
          </div>
        </div>

        {/* Portal Header & Active Profile Identity Card */}
        <div className="relative bg-[#061C16] text-[#FCFBF7] p-8 sm:p-12 mb-10 border border-[#C6A15B]/30 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-medium">
                <Shield className="w-3.5 h-3.5" />
                <span>PRIVATE BROKER &amp; OPERATOR PANEL</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight">
                Owner, Broker &amp; Operator Desk
              </h1>
              <p className="text-xs sm:text-sm text-[#D8D3C8]/80 font-light leading-relaxed">
                Review private client flight &amp; yacht charter mandates, assign aircraft/vessels, submit bespoke quotations, list inventory, and coordinate with peer brokers across forty-two jurisdictions.
              </p>
            </div>

            {/* Currently Active Operator Profile Card */}
            <div className="p-5 bg-[#080B09]/80 border border-[#C6A15B]/40 sm:min-w-[340px] space-y-3">
              <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-[#C6A15B]">
                <span>LOGGED IN OPERATOR</span>
                <span className="text-emerald-400 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  AUTHENTICATED
                </span>
              </div>

              <div className="flex items-center gap-3.5 pt-1">
                <img
                  src={activeBroker.avatarUrl}
                  alt={activeBroker.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#C6A15B]/60"
                />
                <div>
                  <h4 className="font-serif text-lg font-normal text-white">{activeBroker.name}</h4>
                  <p className="text-[10px] text-[#D8D3C8]/70 uppercase tracking-wider">{activeBroker.location}</p>
                </div>
              </div>

              <p className="text-[10px] text-[#D8D3C8]/80 font-light border-t border-white/10 pt-2 line-clamp-1">
                {activeBroker.credentials}
              </p>

              {/* Quick Switch Profiles */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-widest text-[#D8D3C8]/50">SWITCH IDENTITY:</span>
                <select
                  value={activeBroker.id}
                  onChange={(e) => {
                    const found = INITIAL_BROKERS.find((b) => b.id === e.target.value);
                    if (found) setActiveBroker(found);
                  }}
                  className="bg-[#061C16] border border-[#C6A15B]/30 text-[10px] text-white px-2 py-1 focus:outline-none"
                >
                  {INITIAL_BROKERS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.sector.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Portal Navigation Tabs */}
        <div className="flex items-center border-b border-[#D8D3C8] pb-4 mb-8 gap-3 sm:gap-6 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('requests')}
            className={`pb-2.5 px-3 uppercase tracking-[0.2em] font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'requests'
                ? 'border-b-2 border-[#061C16] text-[#061C16]'
                : 'text-[#080B09]/60 hover:text-[#061C16]'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-[#9D7B3E]" />
            <span>1. Private Client Bookings ({bookingRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-2.5 px-3 uppercase tracking-[0.2em] font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'upload'
                ? 'border-b-2 border-[#061C16] text-[#061C16]'
                : 'text-[#080B09]/60 hover:text-[#061C16]'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#9D7B3E]" />
            <span>2. List / Upload Asset</span>
          </button>

          <button
            onClick={() => setActiveTab('directory')}
            className={`pb-2.5 px-3 uppercase tracking-[0.2em] font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'directory'
                ? 'border-b-2 border-[#061C16] text-[#061C16]'
                : 'text-[#080B09]/60 hover:text-[#061C16]'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#9D7B3E]" />
            <span>3. Peer Brokers &amp; Owners Directory</span>
          </button>

          <button
            onClick={() => setActiveTab('guidelines')}
            className={`pb-2.5 px-3 uppercase tracking-[0.2em] font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'guidelines'
                ? 'border-b-2 border-[#061C16] text-[#061C16]'
                : 'text-[#080B09]/60 hover:text-[#061C16]'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5 text-[#9D7B3E]" />
            <span>4. Operator Guidelines</span>
          </button>
        </div>

        {/* TAB 1: LIVE CLIENT REQUESTS */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-light text-[#061C16]">
                  Incoming Private Booking Mandates &amp; Route Requests
                </h3>
                <p className="text-xs text-[#080B09]/70 font-light mt-1">
                  Full client contact information is accessible to verified operators. Assign flights, yachts, or submit quotes directly.
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setFilterCategory('all')}
                  className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-medium ${
                    filterCategory === 'all' ? 'bg-[#061C16] text-white' : 'bg-white border border-[#D8D3C8]'
                  }`}
                >
                  All ({bookingRequests.length})
                </button>
                <button
                  onClick={() => setFilterCategory('aviation')}
                  className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-medium ${
                    filterCategory === 'aviation' ? 'bg-[#061C16] text-white' : 'bg-white border border-[#D8D3C8]'
                  }`}
                >
                  Aviation Only
                </button>
                <button
                  onClick={() => setFilterCategory('marine')}
                  className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-medium ${
                    filterCategory === 'marine' ? 'bg-[#061C16] text-white' : 'bg-white border border-[#D8D3C8]'
                  }`}
                >
                  Marine Only
                </button>
              </div>
            </div>

            {/* Requests Cards List */}
            <div className="space-y-5">
              {filteredRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white border border-[#D8D3C8] p-6 lg:p-8 hover:border-[#061C16] transition-all hover:shadow-lg space-y-5"
                >
                  {/* Top Bar: Route, Category, Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D8D3C8]/60 gap-3">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 bg-[#061C16] text-[#C6A15B] text-[9px] uppercase tracking-widest font-mono">
                        {req.id}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-[#9D7B3E] font-semibold">
                        {req.category === 'aviation' ? 'PRIVATE AVIATION CHARTER' : 'YACHT / MARITIME CHARTER'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 text-[9px] uppercase tracking-widest font-semibold border ${
                          req.status === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : req.status === 'assigned'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : req.status === 'quoted'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-stone-100 text-stone-700 border-stone-300'
                        }`}
                      >
                        STATUS: {req.status.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-[#080B09]/50 font-mono">
                        {new Date(req.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Route & Mission Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Column 1: Route & Date */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] uppercase tracking-widest text-[#080B09]/50 font-medium block">
                        ORIGIN ➔ DESTINATION
                      </span>
                      <h4 className="font-serif text-xl font-medium text-[#061C16]">
                        {req.routeLabel}
                      </h4>
                      <div className="text-xs text-[#080B09]/70 pt-1">
                        <strong>Date:</strong> {req.departureDate} {req.departureTime ? `(${req.departureTime})` : ''}
                      </div>
                      <div className="text-xs text-[#080B09]/70">
                        <strong>Party Size:</strong> {req.passengers} VIP Guests
                      </div>
                    </div>

                    {/* Column 2: Mission Purpose & Budget */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] uppercase tracking-widest text-[#080B09]/50 font-medium block">
                        OCCASION / MISSION SPECIFICATION
                      </span>
                      <p className="text-xs font-semibold text-[#061C16] leading-snug">
                        {req.missionPurpose}
                      </p>
                      {req.specialRequests && (
                        <p className="text-[11px] text-[#080B09]/70 font-light leading-relaxed pt-1">
                          <strong>Notes:</strong> {req.specialRequests}
                        </p>
                      )}
                      <div className="text-xs text-[#9D7B3E] font-medium pt-1">
                        Target Budget: {req.budgetEstimated}
                      </div>
                    </div>

                    {/* Column 3: Client Identity & Direct Contact */}
                    <div className="bg-[#FCFBF7] border border-[#D8D3C8] p-4 space-y-2">
                      <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-[#9D7B3E] font-semibold">
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>CLIENT DOSSIER (UNMASKED)</span>
                      </div>

                      <h5 className="font-serif text-base font-normal text-[#061C16] leading-none">
                        {req.clientName}
                      </h5>
                      {req.organization && (
                        <p className="text-[10px] text-[#080B09]/70 font-medium">{req.organization}</p>
                      )}

                      <div className="space-y-1 pt-2 border-t border-[#D8D3C8]/60 text-xs">
                        <div className="flex items-center gap-2 text-[#061C16]">
                          <Phone className="w-3 h-3 text-[#9D7B3E]" />
                          <a href={`tel:${req.clientPhone}`} className="hover:underline font-mono">
                            {req.clientPhone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-[#061C16]">
                          <Mail className="w-3 h-3 text-[#9D7B3E]" />
                          <a href={`mailto:${req.clientEmail}`} className="hover:underline font-mono truncate">
                            {req.clientEmail}
                          </a>
                        </div>
                      </div>

                      {/* Direct WhatsApp Contact Button */}
                      <div className="pt-2">
                        <a
                          href={`https://wa.me/${req.clientPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                            req.clientName
                          )},%20this%20is%20${encodeURIComponent(
                            activeBroker.name
                          )}%20from%20NP%20GROUPS.%20Regarding%20your%20charter%20request%20(${encodeURIComponent(
                            req.routeLabel
                          )})...`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-[9px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>CONNECT VIA WHATSAPP</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Existing Assignment / Quotation details if present */}
                  {req.assignedAsset && (
                    <div className="p-3 bg-blue-50/70 border border-blue-200 text-xs text-blue-900 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <strong>Assigned Fleet:</strong> {req.assignedAsset} &middot;{' '}
                        <strong>Quotation:</strong> {req.quotationAmount || 'Pending'}
                      </div>
                      <span className="text-[10px] text-blue-700 uppercase tracking-widest font-mono">
                        Handled by: {req.assignedBrokerOrOwner}
                      </span>
                    </div>
                  )}

                  {/* Operator Actions Bar */}
                  <div className="pt-4 border-t border-[#D8D3C8]/60 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-[10px] text-[#080B09]/50 uppercase tracking-widest">
                      Zero Client Surcharges &middot; Direct Operator Settlement
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => setSelectedReqForQuote(req)}
                        className="px-4 py-2 bg-[#061C16] text-white text-[10px] uppercase tracking-wider font-medium hover:bg-[#C6A15B] hover:text-[#061C16] transition-all"
                      >
                        SUBMIT QUOTE / ASSIGN FLEET
                      </button>

                      {req.status !== 'confirmed' && (
                        <button
                          onClick={() => handleUpdateStatus(req.id, 'confirmed')}
                          className="px-4 py-2 border border-emerald-600 text-emerald-700 text-[10px] uppercase tracking-wider font-medium hover:bg-emerald-50 transition-all"
                        >
                          MARK CONFIRMED
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: LIST & UPLOAD ASSET */}
        {activeTab === 'upload' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#9D7B3E] font-medium">
                INVENTORY CONSIGNMENT DESK
              </span>
              <h3 className="font-serif text-3xl font-light text-[#061C16]">
                List Aircraft, Yacht, Luxury Watch, or Natural Diamond
              </h3>
              <p className="text-xs text-[#080B09]/70 font-light leading-relaxed">
                Publish your assets directly to the NP GROUPS global network. Individual brokers, fleet owners, and private collectors can consign inventory without platform listing charges.
              </p>
            </div>

            {uploadSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Success!</strong> Your asset has been published to the active network directory and will appear immediately under your broker profile.
                </span>
              </div>
            )}

            <form onSubmit={handleUploadSubmit} className="bg-white border border-[#D8D3C8] p-8 space-y-6 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#080B09]/70 font-medium mb-1.5">
                    Category *
                  </label>
                  <select
                    value={newAsset.category}
                    onChange={(e) => {
                      const cat = e.target.value as any;
                      setNewAsset({
                        ...newAsset,
                        category: cat,
                        listingMode: cat === 'watches' || cat === 'jewellery' ? 'sale' : 'charter',
                        subCategory:
                          cat === 'aviation'
                            ? 'Private Jets'
                            : cat === 'marine'
                            ? 'Superyachts'
                            : cat === 'watches'
                            ? 'High Complications'
                            : cat === 'jewellery'
                            ? 'Natural Diamonds'
                            : 'Racing Exotics',
                      });
                    }}
                    className="w-full px-3.5 py-2.5 bg-[#FCFBF7] border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                  >
                    <option value="aviation">Private Aviation (Jets &amp; Helicopters)</option>
                    <option value="marine">Marine &amp; Superyachts</option>
                    <option value="automotive">Automotive &amp; Hypercars</option>
                    <option value="watches">Luxury Watches (Sales Only)</option>
                    <option value="jewellery">Fine Jewellery &amp; Diamonds (Sales Only)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#080B09]/70 font-medium mb-1.5">
                    Sub-Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAsset.subCategory}
                    onChange={(e) => setNewAsset({ ...newAsset, subCategory: e.target.value })}
                    placeholder="e.g. VIP Helicopter, Mega Yacht, 10ct D-FL"
                    className="w-full px-3.5 py-2.5 bg-[#FCFBF7] border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#080B09]/70 font-medium mb-1.5">
                    Listing Mode *
                  </label>
                  <select
                    value={newAsset.listingMode}
                    onChange={(e) => setNewAsset({ ...newAsset, listingMode: e.target.value as any })}
                    disabled={newAsset.category === 'watches' || newAsset.category === 'jewellery'}
                    className="w-full px-3.5 py-2.5 bg-[#FCFBF7] border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16] disabled:opacity-50"
                  >
                    {newAsset.category !== 'watches' && newAsset.category !== 'jewellery' && (
                      <option value="charter">Charter / Event Missions Only</option>
                    )}
                    <option value="sale">Acquisition / Sale Only</option>
                    {newAsset.category !== 'watches' && newAsset.category !== 'jewellery' && (
                      <option value="both">Both (Charter &amp; Sale)</option>
                    )}
                  </select>
                  {(newAsset.category === 'watches' || newAsset.category === 'jewellery') && (
                    <span className="text-[9px] text-[#9D7B3E] block mt-1">Strictly Sale Only (No Rental)</span>
                  )}
                </div>
              </div>

              {/* Title & Manufacturer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#080B09]/70 font-medium mb-1.5">
                    Listing Title &amp; Specification *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAsset.title}
                    onChange={(e) => setNewAsset({ ...newAsset, title: e.target.value })}
                    placeholder="e.g. Bombardier Global 7500 or 12.5ct Cushion Fancy Yellow"
                    className="w-full px-3.5 py-2.5 bg-[#FCFBF7] border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#080B09]/70 font-medium mb-1.5">
                    Manufacturer / Builder / Brand
                  </label>
                  <input
                    type="text"
                    required
                    value={newAsset.manufacturer}
                    onChange={(e) => setNewAsset({ ...newAsset, manufacturer: e.target.value })}
                    placeholder="e.g. Gulfstream, Sunseeker, Patek Philippe, GIA"
                    className="w-full px-3.5 py-2.5 bg-[#FCFBF7] border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                  />
                </div>
              </div>

              {/* Price / Charter Rate & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#080B09]/70 font-medium mb-1.5">
                    Asking Price or Hourly Charter Rate *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAsset.priceOrRate}
                    onChange={(e) => setNewAsset({ ...newAsset, priceOrRate: e.target.value })}
                    placeholder="e.g. ₹9.5 Lakhs / hr or ₹45 Cr ($5.5M)"
                    className="w-full px-3.5 py-2.5 bg-[#FCFBF7] border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#080B09]/70 font-medium mb-1.5">
                    Year / Manufacturing Date
                  </label>
                  <input
                    type="text"
                    value={newAsset.year}
                    onChange={(e) => setNewAsset({ ...newAsset, year: e.target.value })}
                    placeholder="e.g. 2023 or 2024 Unworn"
                    className="w-full px-3.5 py-2.5 bg-[#FCFBF7] border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                  />
                </div>
              </div>

              {/* Dynamic Technical Specs according to Category */}
              {newAsset.category === 'aviation' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#D8D3C8]/60">
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-[#080B09]/70 mb-1">
                      Engine Models
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Twin Rolls-Royce Pearl 700"
                      value={newAsset.engines}
                      onChange={(e) => setNewAsset({ ...newAsset, engines: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FCFBF7] border border-[#D8D3C8] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-[#080B09]/70 mb-1">
                      Flying Hours
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 220 Total Time"
                      value={newAsset.flyingHours}
                      onChange={(e) => setNewAsset({ ...newAsset, flyingHours: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FCFBF7] border border-[#D8D3C8] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-[#080B09]/70 mb-1">
                      Range &amp; Max Mach
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 7,750 nm / Mach 0.925"
                      value={newAsset.range}
                      onChange={(e) => setNewAsset({ ...newAsset, range: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FCFBF7] border border-[#D8D3C8] text-xs"
                    />
                  </div>
                </div>
              )}

              {newAsset.category === 'marine' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#D8D3C8]/60">
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-[#080B09]/70 mb-1">
                      Length Overall (LOA)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 40.05m (131 ft)"
                      value={newAsset.loa}
                      onChange={(e) => setNewAsset({ ...newAsset, loa: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FCFBF7] border border-[#D8D3C8] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-[#080B09]/70 mb-1">
                      Engines &amp; Generators
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Twin MTU 12V 4000"
                      value={newAsset.engines}
                      onChange={(e) => setNewAsset({ ...newAsset, engines: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FCFBF7] border border-[#D8D3C8] text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-[#080B09]/70 mb-1">
                      Guest Capacity
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 35 for Events"
                      value={newAsset.seatingCapacity}
                      onChange={(e) => setNewAsset({ ...newAsset, seatingCapacity: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#FCFBF7] border border-[#D8D3C8] text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Photo & Video Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#080B09]/70 font-medium mb-1.5">
                    High-Resolution Photography URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={newAsset.imageUrl}
                    onChange={(e) => setNewAsset({ ...newAsset, imageUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FCFBF7] border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#080B09]/70 font-medium mb-1.5">
                    Client Walkthrough Video Link (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="YouTube / Vimeo / Cloud link"
                    value={newAsset.videoUrl}
                    onChange={(e) => setNewAsset({ ...newAsset, videoUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FCFBF7] border border-[#D8D3C8] text-xs focus:outline-none focus:border-[#061C16]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-[#D8D3C8] flex items-center justify-between">
                <span className="text-[10px] text-[#080B09]/60">
                  Consigned under: <strong>{activeBroker.name}</strong> ({activeBroker.type.replace('_', ' ')})
                </span>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#061C16] text-[#FCFBF7] text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-[#C6A15B] hover:text-[#061C16] transition-all shadow-md flex items-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>PUBLISH ASSET TO NETWORK</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: BROKER & OWNER DIRECTORY */}
        {activeTab === 'directory' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#9D7B3E] font-medium">
                PEER CO-BROKERAGE NETWORK
              </span>
              <h3 className="font-serif text-3xl font-light text-[#061C16]">
                Verified Brokers, Operators &amp; Private Collectors
              </h3>
              <p className="text-xs text-[#080B09]/70 font-light max-w-2xl leading-relaxed">
                Connect directly with certified peer brokers and fleet operators. Co-broker transatlantic jet charters, split superyacht berths, and place high complications with protected commissions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {INITIAL_BROKERS.map((broker) => (
                <div
                  key={broker.id}
                  className="bg-white border border-[#D8D3C8] p-6 space-y-4 hover:border-[#061C16] transition-all hover:shadow-lg flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={broker.avatarUrl}
                        alt={broker.name}
                        className="w-12 h-12 rounded-full object-cover border border-[#C6A15B]"
                      />
                      <div>
                        <h4 className="font-serif text-lg font-medium text-[#061C16] leading-tight">
                          {broker.name}
                        </h4>
                        <span className="text-[10px] text-[#9D7B3E] font-medium uppercase tracking-wider block">
                          {broker.type.replace('_', ' ')} &middot; {broker.sector.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#080B09]/70 font-light leading-relaxed">
                      {broker.credentials}
                    </p>

                    <div className="pt-2 border-t border-[#D8D3C8]/60 grid grid-cols-2 gap-2 text-[10px]">
                      <div>
                        <span className="text-[#080B09]/50 uppercase tracking-widest block">DEALS CLOSED:</span>
                        <span className="font-medium text-[#061C16]">{broker.completedDeals} Transactions</span>
                      </div>
                      <div>
                        <span className="text-[#080B09]/50 uppercase tracking-widest block">TRUST RATING:</span>
                        <span className="font-medium text-emerald-700">&#9733; {broker.rating} / 5.0</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#D8D3C8]/60 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span>{broker.phone}</span>
                      <a
                        href={`https://wa.me/${broker.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-700 hover:underline flex items-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: OPERATOR GUIDELINES */}
        {activeTab === 'guidelines' && (
          <div className="max-w-4xl mx-auto bg-white border border-[#D8D3C8] p-8 sm:p-12 space-y-8 shadow-sm text-xs leading-relaxed text-[#080B09]/80 font-light">
            <div className="space-y-2 border-b border-[#D8D3C8] pb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A15B] font-medium block">
                COMPLIANCE &amp; OPERATIONAL STANDARDS
              </span>
              <h3 className="font-serif text-3xl font-light text-[#061C16]">
                Owner, Operator &amp; Broker Code of Conduct
              </h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-serif text-xl text-[#061C16] font-normal">
                  1. Aviation Operator Standards (DGCA &middot; FAA &middot; EASA)
                </h4>
                <p>
                  All aircraft listed for private charter must possess a valid Air Operator Certificate (AOC) under DGCA India (Part 135/121), FAA Part 135, or European EASA regulations. Pilots must maintain current type-ratings, recurrent simulator training, and comprehensive third-party passenger liability insurance of no less than US$ 100 Million.
                </p>
                <p>
                  Special missions such as <strong>wedding flower showers</strong> and <strong>political campaign landings</strong> require strict pre-flight DGCA local airspace clearances, non-commercial petal dropping permits, and municipal ground safety coordination.
                </p>
              </div>

              <div className="space-y-2 border-t border-[#D8D3C8]/60 pt-6">
                <h4 className="font-serif text-xl text-[#061C16] font-normal">
                  2. Marine &amp; Yacht Charter Protocol (MYBA &middot; Maritime Coding)
                </h4>
                <p>
                  Vessels listed for private party charters, corporate summits, or weddings at sea must comply with maritime safety standards (SOLAS, MCA Large Commercial Yacht Code). Captains must hold valid Master credentials. Event sound systems, guest tenders, and ocean swimming platforms must operate under licensed marine safety personnel.
                </p>
              </div>

              <div className="space-y-2 border-t border-[#D8D3C8]/60 pt-6">
                <h4 className="font-serif text-xl text-[#061C16] font-normal">
                  3. Luxury Timepieces &amp; Diamond Broker Discretion (Sales Only)
                </h4>
                <p>
                  All timepieces and gemstones listed on NP GROUPS are <strong>strictly for sale only</strong> (no rentals are permitted). Independent brokers must hold physical possession or authorized direct mandates from verified owners. Diamonds must feature GIA/SSEF/Gübelin laboratory certificates with serial numbers verified against international stolen asset databases.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Submitting Quote / Assigning Fleet */}
        {selectedReqForQuote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#FCFBF7] border border-[#D8D3C8] p-8 max-w-lg w-full space-y-5 shadow-2xl relative">
              <button
                onClick={() => setSelectedReqForQuote(null)}
                className="absolute top-4 right-4 text-[#080B09]/60 hover:text-black"
              >
                &times;
              </button>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#9D7B3E] font-medium block">
                  RESPOND TO CLIENT MANDATE
                </span>
                <h4 className="font-serif text-2xl font-light text-[#061C16]">
                  {selectedReqForQuote.routeLabel}
                </h4>
                <p className="text-xs text-[#080B09]/70">
                  Client: {selectedReqForQuote.clientName} ({selectedReqForQuote.organization || 'Private Principal'})
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#080B09]/70 mb-1 font-medium">
                    Assign Aircraft or Yacht Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bombardier Learjet 75 (VT-APX) or Sunseeker 131"
                    value={assignedAssetName}
                    onChange={(e) => setAssignedAssetName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D8D3C8]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#080B09]/70 mb-1 font-medium">
                    Proposed Quotation Amount *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹9,20,000 all-inclusive or $125,000"
                    value={quoteAmount}
                    onChange={(e) => setQuoteAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D8D3C8]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#D8D3C8] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedReqForQuote(null)}
                  className="px-4 py-2 border border-[#D8D3C8] text-xs uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleUpdateStatus(
                      selectedReqForQuote.id,
                      'quoted',
                      assignedAssetName || 'Fleet Under Review',
                      quoteAmount || 'Quote Sent'
                    );
                  }}
                  className="px-5 py-2 bg-[#061C16] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#C6A15B] hover:text-[#061C16]"
                >
                  TRANSMIT PROPOSAL
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
