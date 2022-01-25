<?php

namespace Insitaction\EasyAdminFieldsBundle\Field;

use Doctrine\ORM\Mapping as ORM;

trait LoggableTrait
{
    /**
     * @ORM\Column(type="json")
     */
    #[ORM\Column(type: "json")]
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
    
    /**
     * @param array{type: string, content: string, filename?: string} $log
     * @return $this
     */
    public function addLog(array $log): self
    {
        $this->logs[] = $log;

        return $this;
    }
}