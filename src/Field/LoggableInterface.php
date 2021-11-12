<?php

namespace Insitaction\EasyAdminFieldsBundle\Field;

interface LoggableInterface
{
    public function getLogs(): ?array;

    public function setLogs(array $logs): self;

    /**
     * @param array{type: string, content: string, filename?: string} $log
     */
    public function addLog(array $log): self;
}