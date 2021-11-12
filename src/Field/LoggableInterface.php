<?php

namespace Insitaction\EasyAdminFieldsBundle\Field;

interface LoggableInterface
{
    public function getLogs(): ?array;

    public function setLogs(array $logs): self;
}