<?php

namespace Insitaction\EasyAdminFieldsBundle\DTO;

final class MaskFieldOptions
{
    public const IDENTIFIER_TYPE_LABEL = 'label';
    public const IDENTIFIER_TYPE_VALUE = 'value';

    private string $identifierType = 'value';
    /**
     * @var array<{value: string, fields: array<string>}>
     */
    private array $map;

    public function serialize(): array
    {
        return [
            'map' => $this->getMap(),
            'identifierType' => $this->getIdentifierType(),
        ];
    }

    public static function new(): self
    {
        return new self();
    }

    public function addMap(string $value, array $fields): self
    {
        $this->map[] = [
            'value' => $value,
            'fields' => $fields
        ];

        return $this;
    }

    /**
     * @return array<{value: string, fields: array<string>}>
     */
    public function getMap(): array
    {
        return $this->map;
    }

    public function setIdentifierType(string $identifierType): self
    {
        $this->identifierType = $identifierType;

        return $this;
    }

    public function getIdentifierType(): string
    {
        return $this->identifierType;
    }
}
