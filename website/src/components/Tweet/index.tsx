/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ReactNode, memo} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export interface Props {
  url: string;
  handle: string;
  name: string;
  content: ReactNode;
  date: string;
  githubUsername: string;
}

function TweetComponent({
  url,
  handle,
  name,
  content,
  date,
  githubUsername,
}: Props): ReactNode {
  const avatarUrl = `https://unavatar.io/x/${encodeURIComponent(
    handle,
  )}?fallback=https://github.com/${encodeURIComponent(githubUsername)}.png`;

  return (
    <div className={clsx('card', styles.tweet)}>
      <div className="card__header">
        <div className="avatar">
          <img
            alt={name || 'User avatar'}
            className="avatar__photo"
            src={avatarUrl}
            width="48"
            height="48"
            loading="lazy"
          />
          <div className={clsx('avatar__intro', styles.tweetMeta)}>
            <strong className="avatar__name">{name}</strong>
            <span>@{handle}</span>
          </div>
        </div>
      </div>

      <div className={clsx('card__body', styles.tweet)}>{content}</div>

      <div className="card__footer">
        <Link
          className={clsx(styles.tweetMeta, styles.tweetDate)}
          to={url}
          rel="noopener noreferrer"
        >
          {date}
        </Link>
      </div>
    </div>
  );
}

export default memo(TweetComponent);
