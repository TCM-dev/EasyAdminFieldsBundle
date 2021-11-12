<?php

namespace Insitaction\EasyAdminFieldsBundle\Field;

use Doctrine\ORM\Mapping as ORM;

trait LoggableTrait
{
    /**
     * @ORM\Column(type="json")
     */
    private array $logs = [];

    public function getLogs(): ?array
    {
        return $this->logs;
    }

    public function setLogs(array $logs): self
    {
        $this->logs = $logs;

        return $this;
    }
}