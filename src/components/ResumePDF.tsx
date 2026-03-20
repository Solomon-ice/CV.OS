import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

// Register fonts if needed
// Font.register({ family: 'Inter', src: '...' });

const baseStyles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: 'Helvetica' },
});

// --- Classic Styles ---
const classicStyles = StyleSheet.create({
  header: { marginBottom: 30, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 15 },
  name: { fontSize: 24, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 2 },
  title: { fontSize: 12, color: '#666' },
  section: { marginBottom: 20 },
  sectionHeader: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', borderBottomWidth: 0.5, borderBottomColor: '#ccc', paddingBottom: 2, marginBottom: 8 },
  item: { marginBottom: 12 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  itemTitle: { fontWeight: 'bold' },
  itemSubtitle: { fontStyle: 'italic', color: '#555' },
  description: { marginTop: 3, lineHeight: 1.4, color: '#444' },
});

// --- Minimal Styles ---
const minimalStyles = StyleSheet.create({
  header: { textAlign: 'center', marginBottom: 40, borderBottomWidth: 0.5, borderBottomColor: '#eee', paddingBottom: 20 },
  name: { fontSize: 26, fontWeight: 'black', textTransform: 'uppercase', letterSpacing: 1 },
  title: { fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: 2, marginTop: 4 },
  row: { flexDirection: 'row', marginBottom: 20, gap: 20 },
  sidebar: { width: '25%' },
  main: { width: '75%' },
  sidebarHeading: { fontSize: 8, fontWeight: 'black', textTransform: 'uppercase', color: '#aaa', marginBottom: 10 },
  item: { marginBottom: 15 },
  date: { fontSize: 8, color: '#ccc', textTransform: 'uppercase', marginBottom: 2 },
});

// --- Glass Styles (Adapted for PDF) ---
const glassStyles = StyleSheet.create({
  page: { padding: 40, backgroundColor: '#0a0a0b', color: '#fff' },
  header: { marginBottom: 40 },
  badge: { backgroundColor: '#1e1e20', padding: '2 8', borderRadius: 10, fontSize: 8, color: '#60a5fa', marginBottom: 10 },
  name: { fontSize: 32, fontWeight: 'black' },
  title: { fontSize: 16, color: '#ffffff80', marginTop: 4 },
  sectionHeader: { fontSize: 9, color: '#ffffff30', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 15 },
  item: { borderLeftWidth: 1, borderLeftColor: '#ffffff10', paddingLeft: 15, marginBottom: 20 },
});

// --- Corporate Styles ---
const corporateStyles = StyleSheet.create({
  page: { padding: 50, fontFamily: 'Times-Roman' },
  header: { borderBottomWidth: 3, borderBottomColor: '#1e3a8a', paddingBottom: 10, marginBottom: 20 },
  name: { fontSize: 28, color: '#1e3a8a', textTransform: 'uppercase' },
  title: { fontSize: 14, color: '#444', fontWeight: 'bold' },
  sectionHeader: { fontSize: 10, color: '#1e3a8a', fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 2, marginBottom: 10, textTransform: 'uppercase' },
});

const ClassicLayout = ({ data }: { data: ResumeData }) => (
  <View>
    <View style={classicStyles.header}>
      <Text style={classicStyles.name}>{data.name || 'Your Name'}</Text>
      <Text style={classicStyles.title}>{data.title || 'Professional Title'}</Text>
    </View>
    {data.summary && (
      <View style={classicStyles.section}>
        <Text style={classicStyles.sectionHeader}>Summary</Text>
        <Text style={classicStyles.description}>{data.summary}</Text>
      </View>
    )}
    {data.experience?.length > 0 && (
      <View style={classicStyles.section}>
        <Text style={classicStyles.sectionHeader}>Experience</Text>
        {data.experience.map((exp: any, i: number) => (
          <View key={i} style={classicStyles.item}>
            <View style={classicStyles.itemHeader}>
              <Text style={classicStyles.itemTitle}>{exp.title}</Text>
              <Text style={{ color: '#888' }}>{exp.date}</Text>
            </View>
            <Text style={classicStyles.itemSubtitle}>{exp.subtitle}</Text>
            <Text style={classicStyles.description}>{exp.description}</Text>
          </View>
        ))}
      </View>
    )}
    {data.skills?.length > 0 && (
      <View style={classicStyles.section}>
        <Text style={classicStyles.sectionHeader}>Skills</Text>
        <Text style={classicStyles.description}>{data.skills.join('  •  ')}</Text>
      </View>
    )}
  </View>
);

const MinimalLayout = ({ data }: { data: ResumeData }) => (
  <View>
    <View style={minimalStyles.header}>
      <Text style={minimalStyles.name}>{data.name}</Text>
      <Text style={minimalStyles.title}>{data.title}</Text>
    </View>
    {data.experience?.length > 0 && (
      <View style={minimalStyles.row}>
        <View style={minimalStyles.sidebar}><Text style={minimalStyles.sidebarHeading}>Experience</Text></View>
        <View style={minimalStyles.main}>
          {data.experience.map((exp: any, i: number) => (
            <View key={i} style={minimalStyles.item}>
              <Text style={minimalStyles.date}>{exp.date}</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 11 }}>{exp.title}</Text>
              <Text style={{ color: '#666', marginBottom: 4 }}>{exp.subtitle}</Text>
              <Text style={{ color: '#444', lineHeight: 1.4 }}>{exp.description}</Text>
            </View>
          ))}
        </View>
      </View>
    )}
  </View>
);

const GlassLayout = ({ data }: { data: ResumeData }) => (
  <View>
    <View style={glassStyles.header}>
      <View style={glassStyles.badge}><Text>Hiring</Text></View>
      <Text style={glassStyles.name}>{data.name}</Text>
      <Text style={glassStyles.title}>{data.title}</Text>
    </View>
    <Text style={glassStyles.sectionHeader}>Experience</Text>
    {data.experience.map((exp: any, i: number) => (
      <View key={i} style={glassStyles.item}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{exp.title}</Text>
          <Text style={{ fontSize: 8, color: '#ffffff30' }}>{exp.date}</Text>
        </View>
        <Text style={[{ color: '#60a5fa', marginBottom: 5 }]}>{exp.subtitle}</Text>
        <Text style={{ color: '#ffffff50', lineHeight: 1.4 }}>{exp.description}</Text>
      </View>
    ))}
  </View>
);

const CorporateLayout = ({ data }: { data: ResumeData }) => (
  <View style={{ fontFamily: 'Times-Roman' }}>
    <View style={corporateStyles.header}>
      <Text style={corporateStyles.name}>{data.name}</Text>
      <Text style={corporateStyles.title}>{data.title}</Text>
    </View>
    <Text style={corporateStyles.sectionHeader}>Professional Experience</Text>
    {data.experience.map((exp: any, i: number) => (
      <View key={i} style={{ marginBottom: 15 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold' }}>{exp.title.toUpperCase()}</Text>
          <Text>{exp.date}</Text>
        </View>
        <Text style={{ color: '#1e3a8a', fontWeight: 'bold', marginBottom: 4 }}>{exp.subtitle}</Text>
        <Text style={{ fontStyle: 'italic', color: '#444' }}>{exp.description}</Text>
      </View>
    ))}
  </View>
);

export const ResumePDF = ({ data }: { data: ResumeData }) => {
  const theme = data.theme || 'classic';
  
  return (
    <Document>
      <Page size="A4" style={[baseStyles.page, theme === 'glass' && glassStyles.page, theme === 'corporate' && corporateStyles.page].filter(Boolean) as any}>
        {theme === 'classic' && <ClassicLayout data={data} />}
        {theme === 'minimal' && <MinimalLayout data={data} />}
        {theme === 'glass' && <GlassLayout data={data} />}
        {theme === 'corporate' && <CorporateLayout data={data} />}
      </Page>
    </Document>
  );
};
