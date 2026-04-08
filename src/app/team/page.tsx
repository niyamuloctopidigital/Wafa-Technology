'use client';

import { useEffect, useMemo, useState } from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  email?: string;
  department?: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  isLeader: boolean;
  order: number;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDepartment, setActiveDepartment] = useState('All');

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const res = await fetch('/api/team?isActive=true');
        if (!res.ok) throw new Error('Failed to fetch team members');
        const data = await res.json();
        setMembers(
          (data.data || []).map((member: any) => ({
            ...member,
            id: member._id || member.id,
            image: member.image || member.imageUrl || '',
          }))
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
  }, []);

  const leaders = useMemo(
    () => members.filter((member) => member.isLeader),
    [members]
  );

  const experts = useMemo(
    () => members.filter((member) => !member.isLeader),
    [members]
  );

  const departments = useMemo(() => {
    const rawDepartments = experts.map((member) => member.department || 'General');
    return ['All', ...Array.from(new Set(rawDepartments))];
  }, [experts]);

  const visibleExperts = useMemo(() => {
    if (activeDepartment === 'All') return experts;
    return experts.filter(
      (member) => (member.department || 'General') === activeDepartment
    );
  }, [activeDepartment, experts]);

  useEffect(() => {
    if (departments.length && activeDepartment === 'All') return;
    if (!departments.includes(activeDepartment)) {
      setActiveDepartment('All');
    }
  }, [departments, activeDepartment]);

  return (
    <main className="bg-[#050505] text-white min-h-screen">
      <section className="max-container py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-green-400">Team</p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold">Meet Our Leadership & Expert Team</h1>
          <p className="mt-6 text-gray-400 text-lg leading-8">
            Discover the people shaping Wafa Technology. Leaders set the vision, while our expert teams deliver solutions across departments.
          </p>
        </div>
      </section>

      <section className="max-container px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-10">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Leadership Team</h2>
            <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
              Our leadership team brings strategic direction, deep industry expertise, and a strong focus on client success.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading leaders…</div>
        ) : leaders.length === 0 ? (
          <div className="text-center py-16 text-gray-500">No leaders have been added yet.</div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {leaders.map((leader) => (
              <div
                key={leader.id}
                className="group bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-green-400/40 hover:shadow-[0_20px_80px_rgba(34,197,94,0.10)] transition-all w-full max-w-[400px]"
              >
                <div className="overflow-hidden rounded-[32px] bg-white/5 mb-6">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-green-400 uppercase tracking-[0.24em]">Leader</p>
                    <h3 className="mt-3 text-2xl font-semibold">{leader.name}</h3>
                    <p className="text-gray-300 mt-2">{leader.role}</p>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{leader.bio}</p>
                  <div className="flex flex-wrap gap-3 pt-4">
                    {leader.linkedin && (
                      <a href={leader.linkedin} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white">
                        LinkedIn
                      </a>
                    )}
                    {leader.twitter && (
                      <a href={leader.twitter} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white">
                        Twitter
                      </a>
                    )}
                    {leader.github && (
                      <a href={leader.github} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white">
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="max-container px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold">Meet Our Expert Team</h2>
              <p className="text-gray-400 mt-2 max-w-2xl">
                Experts organized by department so you can connect with the right specialists across development, design, marketing, and more.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {departments.map((department) => (
                <button
                  key={department}
                  onClick={() => setActiveDepartment(department)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeDepartment === department
                      ? 'bg-[#4ADE80] text-black'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {department}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading expert team...</div>
        ) : visibleExperts.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No expert members have been added for this department yet.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {visibleExperts.map((expert) => (
              <div key={expert.id} className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-green-400/40 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-28 h-28 rounded-3xl overflow-hidden bg-white/5">
                    <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm text-green-400 uppercase tracking-[0.24em]">{expert.department || 'General'}</p>
                    <h3 className="text-xl font-semibold mt-2">{expert.name}</h3>
                    <p className="text-gray-300 mt-1">{expert.role}</p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed">{expert.bio}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
