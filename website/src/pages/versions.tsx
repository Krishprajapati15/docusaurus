/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 * Licensed under the MIT license in the LICENSE file.
 */

import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import {
  useVersions,
  useLatestVersion,
} from '@docusaurus/plugin-content-docs/client';

import VersionsArchived from '@site/versionsArchived.json';

const docsPluginId = undefined; // Default plugin instance
const VersionsArchivedList = Object.entries(VersionsArchived);

const DocumentationLabel = () => (
  <Translate id="versionsPage.versionEntry.link">Documentation</Translate>
);

const ReleaseNotesLabel = () => (
  <Translate id="versionsPage.versionEntry.releaseNotes">Release Notes</Translate>
);

export default function Version(): ReactNode {
  const {
    siteConfig: { organizationName, projectName },
  } = useDocusaurusContext();

  const versions = useVersions(docsPluginId);
  const latestVersion = useLatestVersion(docsPluginId);
  const currentVersion = versions.find((v) => v.name === 'current')!;
  const pastVersions = versions.filter(
    (v) => v !== latestVersion && v.name !== 'current',
  );

  const repoUrl = `https://github.com/${organizationName}/${projectName}`;

  return (
    <Layout
      title="Versions"
      description="Docusaurus 2 Versions page listing all documented site versions"
    >
      <main className="container margin-vert--lg">
        <Heading as="h1">
          <Translate id="versionsPage.title">
            Docusaurus documentation versions
          </Translate>
        </Heading>

        {/* Current Stable Version */}
        <div className="margin-bottom--lg">
          <Heading as="h3" id="next">
            <Translate id="versionsPage.current.title">
              Current version (Stable)
            </Translate>
          </Heading>
          <p>
            <Translate id="versionsPage.current.description">
              Here you can find the documentation for current released version.
            </Translate>
          </p>
          <table>
            <tbody>
              <tr>
                <th>{latestVersion.label}</th>
                <td>
                  <Link to={latestVersion.path}>
                    <DocumentationLabel />
                  </Link>
                </td>
                <td>
                  <Link to={`${repoUrl}/releases/tag/v${latestVersion.name}`}>
                    <ReleaseNotesLabel />
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Next/Unreleased Version */}
        {currentVersion !== latestVersion && (
          <div className="margin-bottom--lg">
            <Heading as="h3" id="latest">
              <Translate id="versionsPage.next.title">
                Next version (Unreleased)
              </Translate>
            </Heading>
            <p>
              <Translate id="versionsPage.next.description">
                Here you can find the documentation for work-in-process unreleased version.
              </Translate>
            </p>
            <table>
              <tbody>
                <tr>
                  <th>{currentVersion.label}</th>
                  <td>
                    <Link to={currentVersion.path}>
                      <DocumentationLabel />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Archived and Past Versions */}
        {(pastVersions.length > 0 || VersionsArchivedList.length > 0) && (
          <div className="margin-bottom--lg">
            <Heading as="h3" id="archive">
              <Translate id="versionsPage.archived.title">
                Past versions (Not maintained anymore)
              </Translate>
            </Heading>
            <p>
              <Translate id="versionsPage.archived.description">
                Here you can find documentation for previous versions of Docusaurus.
              </Translate>
            </p>
            <table>
              <tbody>
                {pastVersions.map((version) => (
                  <tr key={version.name}>
                    <th>{version.label}</th>
                    <td>
                      <Link to={version.path}>
                        <DocumentationLabel />
                      </Link>
                    </td>
                    <td>
                      <Link href={`${repoUrl}/releases/tag/v${version.name}`}>
                        <ReleaseNotesLabel />
                      </Link>
                    </td>
                  </tr>
                ))}
                {VersionsArchivedList.map(([versionName, versionUrl]) => (
                  <tr key={versionName}>
                    <th>{versionName}</th>
                    <td>
                      <Link to={versionUrl}>
                        <DocumentationLabel />
                      </Link>
                    </td>
                    <td>
                      <Link href={`${repoUrl}/releases/tag/v${versionName}`}>
                        <ReleaseNotesLabel />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Legacy v1 */}
        <div className="margin-bottom--lg">
          <Heading as="h3" id="legacy">
            <Translate id="versionsPage.legacy.title">
              Docusaurus v1 (Legacy)
            </Translate>
          </Heading>
          <p>
            <Translate id="versionsPage.legacy.description">
              Here you can find documentation for legacy version of Docusaurus.
            </Translate>
          </p>
          <table>
            <tbody>
              <tr>
                <th>1.x</th>
                <td>
                  <Link href="https://v1.docusaurus.io/docs/en/installation">
                    <DocumentationLabel />
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </Layout>
  );
}
