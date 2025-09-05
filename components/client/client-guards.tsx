"use client";

import React from 'react';
import FetchGuard from './fetch-guard';
import ErrorGuard from './error-guard';

export default function ClientGuards() {
  return (
    <>
      <FetchGuard />
      <ErrorGuard />
    </>
  );
}
