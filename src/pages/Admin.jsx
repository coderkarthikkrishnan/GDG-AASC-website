import { Link } from 'react-router-dom';
import { useAuth } from '../authContext';
import { Settings, Image, Users, Calendar, FileText } from 'lucide-react';

export default function Admin() {
    const { isAdmin } = useAuth();

    if (!isAdmin) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-black">
                <div className="text-center p-8 rounded-3xl glass-card border border-slate-800">
                    <h2 className="text-3xl font-extrabold text-white mb-4">Access Denied</h2>
                    <p className="text-slate-400">You do not have administrator privileges.</p>
                </div>
            </div>
        );
    }

    const adminLinks = [
        { title: "Manage Events", path: "/events/new", icon: Calendar, color: "text-[#4285F4]", bg: "bg-[#4285F4]/10" },
        { title: "Manage Team", path: "/admin/team", icon: Users, color: "text-[#34A853]", bg: "bg-[#34A853]/10" },
        { title: "Manage Gallery", path: "/admin/gallery", icon: Image, color: "text-[#FBBC04]", bg: "bg-[#FBBC04]/10" },
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-black relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4285F4]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
            
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                        <Settings className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold font-heading text-white">Admin Dashboard</h1>
                        <p className="text-slate-400 mt-1">Manage content across the entire GDG website</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {adminLinks.map((link) => (
                        <Link 
                            key={link.title} 
                            to={link.path}
                            className="group p-8 rounded-3xl bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-md border border-slate-700/50 hover:border-[#4285F4]/50 transition-all duration-300 flex items-center gap-6"
                        >
                            <div className={`p-4 rounded-2xl ${link.bg} transition-transform group-hover:scale-110`}>
                                <link.icon className={`w-8 h-8 ${link.color}`} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#4285F4] transition-colors">{link.title}</h3>
                                <p className="text-sm text-slate-400">Add, edit, or remove entries</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
