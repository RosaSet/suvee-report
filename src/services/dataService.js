import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

// Helper: Convert DB snake_case row to JS camelCase
export const mapDailyReportFromDb = (row) => ({
  id: row.id,
  date: row.date,
  platform: row.platform,
  campaignName: row.campaign_name,
  objective: row.objective,
  spend: Number(row.spend || 0),
  impressions: Number(row.impressions || 0),
  reach: Number(row.reach || 0),
  leads: Number(row.leads || 0),
  salesClosed: Number(row.sales_closed || 0),
  revenue: Number(row.revenue || 0),
  notes: row.notes,
  status: row.status,
  boostLink: row.boost_link,
  startBoost: row.start_boost,
  endBoost: row.end_boost,
  dailyMilestones: row.daily_milestones || [],
  authorId: row.author_id,
  authorName: row.author_name,
  authorRole: row.author_role,
  authorAvatar: row.author_avatar
});

export const mapDailyReportToDb = (item) => ({
  id: item.id,
  date: item.date,
  platform: item.platform,
  campaign_name: item.campaignName,
  objective: item.objective,
  spend: Number(item.spend || 0),
  impressions: Number(item.impressions || 0),
  reach: Number(item.reach || 0),
  leads: Number(item.leads || 0),
  sales_closed: Number(item.salesClosed || 0),
  revenue: Number(item.revenue || 0),
  notes: item.notes,
  status: item.status,
  boost_link: item.boostLink,
  start_boost: item.startBoost,
  end_boost: item.endBoost,
  daily_milestones: item.dailyMilestones || [],
  author_id: item.authorId,
  author_name: item.authorName,
  author_role: item.authorRole,
  author_avatar: item.authorAvatar
});

export const mapEditorReportFromDb = (row) => ({
  id: row.id,
  date: row.date,
  editorName: row.editor_name,
  videoTitle: row.video_title,
  platform: row.platform,
  videosCount: Number(row.videos_count || 1),
  hooksCount: Number(row.hooks_count || 1),
  videoFormat: row.video_format,
  driveLink: row.drive_link,
  status: row.status,
  notes: row.notes,
  authorId: row.author_id,
  authorName: row.author_name,
  authorRole: row.author_role,
  authorAvatar: row.author_avatar
});

export const mapEditorReportToDb = (item) => ({
  id: item.id,
  date: item.date,
  editor_name: item.editorName,
  video_title: item.videoTitle,
  platform: item.platform,
  videos_count: Number(item.videosCount || 1),
  hooks_count: Number(item.hooksCount || 1),
  video_format: item.videoFormat,
  drive_link: item.driveLink,
  status: item.status,
  notes: item.notes,
  author_id: item.authorId,
  author_name: item.authorName,
  author_role: item.authorRole,
  author_avatar: item.authorAvatar
});

export const mapWeeklyContentFromDb = (row) => ({
  id: row.id,
  week: row.week,
  weekLabel: row.week_label,
  date: row.date,
  title: row.title,
  contentType: row.content_type,
  platform: row.platform,
  driveLink: row.drive_link,
  boostLink: row.boost_link,
  status: row.status,
  notes: row.notes,
  scriptFileName: row.script_file_name,
  scriptFileSize: row.script_file_size,
  scriptFileUrl: row.script_file_url,
  scriptText: row.script_text,
  authorId: row.author_id,
  authorName: row.author_name,
  authorRole: row.author_role,
  authorAvatar: row.author_avatar
});

export const mapWeeklyContentToDb = (item) => ({
  id: item.id,
  week: item.week,
  week_label: item.weekLabel,
  date: item.date,
  title: item.title,
  content_type: item.contentType,
  platform: item.platform,
  drive_link: item.driveLink,
  boost_link: item.boostLink,
  status: item.status,
  notes: item.notes,
  script_file_name: item.scriptFileName,
  script_file_size: item.scriptFileSize,
  script_file_url: item.scriptFileUrl,
  script_text: item.scriptText,
  author_id: item.authorId,
  author_name: item.authorName,
  author_role: item.authorRole,
  author_avatar: item.authorAvatar
});

export const mapUserFromDb = (row) => ({
  id: row.id,
  username: row.username,
  password: row.password,
  name: row.name,
  role: row.role,
  roleLabel: row.role_label,
  phone: row.phone,
  startDate: row.start_date,
  avatar: row.avatar,
  bio: row.bio
});

export const mapUserToDb = (item) => ({
  id: item.id,
  username: item.username,
  password: item.password,
  name: item.name,
  role: item.role,
  role_label: item.roleLabel,
  phone: item.phone,
  start_date: item.startDate,
  avatar: item.avatar,
  bio: item.bio
});

// =========================================================
// DATA SERVICE API
// =========================================================

export const dataService = {
  isConfigured: isSupabaseConfigured,

  // Load all initial data from Supabase
  async fetchAll() {
    if (!isSupabaseConfigured) return null;

    try {
      const [usersRes, dailyRes, editorRes, weeklyRes] = await Promise.all([
        supabase.from('users').select('*').order('created_at', { ascending: true }),
        supabase.from('daily_reports').select('*').order('date', { ascending: false }),
        supabase.from('editor_reports').select('*').order('date', { ascending: false }),
        supabase.from('weekly_contents').select('*').order('date', { ascending: false })
      ]);

      return {
        users: usersRes.data ? usersRes.data.map(mapUserFromDb) : null,
        dailyReports: dailyRes.data ? dailyRes.data.map(mapDailyReportFromDb) : null,
        editorReports: editorRes.data ? editorRes.data.map(mapEditorReportFromDb) : null,
        weeklyContents: weeklyRes.data ? weeklyRes.data.map(mapWeeklyContentFromDb) : null
      };
    } catch (error) {
      console.error("Error fetching data from Supabase:", error);
      return null;
    }
  },

  // Daily Reports
  async insertDailyReport(report) {
    if (!isSupabaseConfigured) return;
    try {
      await supabase.from('daily_reports').insert(mapDailyReportToDb(report));
    } catch (err) {
      console.error("Supabase insertDailyReport error:", err);
    }
  },

  async deleteDailyReport(id) {
    if (!isSupabaseConfigured) return;
    try {
      await supabase.from('daily_reports').delete().eq('id', id);
    } catch (err) {
      console.error("Supabase deleteDailyReport error:", err);
    }
  },

  // Editor Reports
  async insertEditorReport(report) {
    if (!isSupabaseConfigured) return;
    try {
      await supabase.from('editor_reports').insert(mapEditorReportToDb(report));
    } catch (err) {
      console.error("Supabase insertEditorReport error:", err);
    }
  },

  async deleteEditorReport(id) {
    if (!isSupabaseConfigured) return;
    try {
      await supabase.from('editor_reports').delete().eq('id', id);
    } catch (err) {
      console.error("Supabase deleteEditorReport error:", err);
    }
  },

  // Weekly Contents
  async insertWeeklyContent(content) {
    if (!isSupabaseConfigured) return;
    try {
      await supabase.from('weekly_contents').insert(mapWeeklyContentToDb(content));
    } catch (err) {
      console.error("Supabase insertWeeklyContent error:", err);
    }
  },

  async deleteWeeklyContent(id) {
    if (!isSupabaseConfigured) return;
    try {
      await supabase.from('weekly_contents').delete().eq('id', id);
    } catch (err) {
      console.error("Supabase deleteWeeklyContent error:", err);
    }
  },

  // Users
  async insertUser(user) {
    if (!isSupabaseConfigured) return;
    try {
      await supabase.from('users').insert(mapUserToDb(user));
    } catch (err) {
      console.error("Supabase insertUser error:", err);
    }
  },

  async deleteUser(id) {
    if (!isSupabaseConfigured) return;
    try {
      await supabase.from('users').delete().eq('id', id);
    } catch (err) {
      console.error("Supabase deleteUser error:", err);
    }
  },

  async updateUser(user) {
    if (!isSupabaseConfigured) return;
    try {
      await supabase.from('users').update(mapUserToDb(user)).eq('id', user.id);
    } catch (err) {
      console.error("Supabase updateUser error:", err);
    }
  }
};
