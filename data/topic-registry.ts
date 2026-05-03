// data/topic-registry.ts
import { TopicModule } from '../types/topic';
import possessives from './modules/possessives';
import presentBod from './modules/present-bod';
import greetings from './modules/greetings';

// Add new topic modules here — import and add to the array
export const TOPIC_REGISTRY: TopicModule[] = [
  possessives,
  presentBod,
  greetings,
];

// Stub entries for tiles that aren't built yet
export interface TopicStub {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  icon: string;
  cefr: 'A1' | 'A2' | 'B1';
  status: 'drill' | 'reference' | 'coming_soon';
}

export const TOPIC_STUBS: TopicStub[] = [
  { id: 'past-patterns', slug: 'past-patterns', title: 'Y Gorffennol', titleEn: 'Past Tense Patterns', icon: '⏪', cefr: 'A1', status: 'coming_soon' },
  { id: 'future-bydd', slug: 'future-bydd', title: 'Y Dyfodol', titleEn: 'Future Tense (bydd)', icon: '⏩', cefr: 'A1', status: 'coming_soon' },
  { id: 'commands', slug: 'commands', title: 'Gorchymyn', titleEn: 'Commands', icon: '📢', cefr: 'A1', status: 'coming_soon' },
  { id: 'rhaid', slug: 'rhaid', title: 'Rhaid i fi', titleEn: 'Must / Have to', icon: '⚠️', cefr: 'A1', status: 'coming_soon' },
  { id: 'cyn-ar-ol', slug: 'cyn-ar-ol', title: 'Cyn / Ar ôl', titleEn: 'Before / After', icon: '🔄', cefr: 'A1', status: 'coming_soon' },
  { id: 'weather', slug: 'weather', title: 'Y Tywydd', titleEn: 'Weather', icon: '🌦️', cefr: 'A1', status: 'coming_soon' },
  { id: 'opinions', slug: 'opinions', title: 'Barn', titleEn: 'Opinions', icon: '💬', cefr: 'A2', status: 'coming_soon' },
  { id: 'conditional', slug: 'conditional', title: 'Amodol', titleEn: 'Conditional', icon: '🤔', cefr: 'B1', status: 'coming_soon' },
];

// Combined list for rendering tiles
export function getAllTopicTiles() {
  const fromRegistry = TOPIC_REGISTRY.map(t => ({
    id: t.id,
    slug: t.slug,
    title: t.title,
    titleEn: t.titleEn,
    icon: t.icon,
    cefr: t.cefr,
    status: t.status,
  }));
  return [...fromRegistry, ...TOPIC_STUBS];
}

export function getTopicBySlug(slug: string): TopicModule | undefined {
  return TOPIC_REGISTRY.find(t => t.slug === slug);
}
