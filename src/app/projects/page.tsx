import type { Metadata } from 'next';

import { metadata as projectPageMetadata } from './metadata';

import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = projectPageMetadata;

export default function ProjectsPage() {

  return <ProjectsClient />;

}