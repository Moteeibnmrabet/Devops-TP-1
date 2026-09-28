import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getUsers,
  createUser,
  type AdminUser,
} from "../services/api";

const logo = new URL("../../logo/edge_consulting_portage_logo-removebg-preview.png", import.meta.url).href;

export default function AdminPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les utilisateurs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!name || !email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      await createUser({
        name,
        email,
        password,
      });

      setName("");
      setEmail("");
      setPassword("");

      await loadUsers();
    } catch (err: any) {
      console.error(err);

      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Erreur lors de la création.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-900 p-8">
      <div className="max-w-6xl mx-auto">

        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="EDGE" className="h-12 w-12" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Administration</h1>
              <p className="text-sm text-slate-600">Gestion des utilisateurs et des accès</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
            className="rounded-xl border border-[#dbe7ff] bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-[#eff6ff]"
          >
            Déconnexion
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-[#dbe7ff] shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-[#0f52ba]">Créer un utilisateur</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full rounded-lg border border-[#dbe7ff] bg-[#f4fbff] p-3 text-slate-900"
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="w-full rounded-lg border border-[#dbe7ff] bg-[#f4fbff] p-3 text-slate-900"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="w-full rounded-lg border border-[#dbe7ff] bg-[#f4fbff] p-3 text-slate-900"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className="text-red-600">{error}</p>}

              <button
                type="submit"
                className="w-full rounded-xl bg-[#0f52ba] hover:bg-[#0b47a3] text-white font-semibold px-6 py-3 transition shadow"
              >
                Créer le compte
              </button>
            </form>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#dbe7ff] shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-[#0f52ba]">Utilisateurs</h2>

            {loading ? (
              <p className="text-slate-600">Chargement...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100">
                  <thead className="bg-[#eef6ff] text-slate-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium">Nom</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Rôle</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-[#f4fbff]">
                        <td className="px-4 py-3 text-slate-900">{u.name}</td>
                        <td className="px-4 py-3 text-slate-700">{u.email}</td>
                        <td className="px-4 py-3">
                          <span className="rounded-full bg-[#eef6ff] px-3 py-1 text-xs font-semibold text-[#0f52ba]">
                            {u.role}
                          </span>
                        </td>
                      </tr>
                    ))}

                    {users.length === 0 && (
                      <tr>
                        <td colSpan={3} className="text-center p-5 text-slate-700">
                          Aucun utilisateur.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}