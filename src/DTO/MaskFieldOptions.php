<?php

namespace Insitaction\EasyAdminFieldsBundle\DTO;

final class MaskFieldOptions
{
    private string $identifierType = 'value';
    private array $map;

    public function __serialize(): array
    {
        return [
            'map' => $this->getEncodedMap(),
            'identifierType' => $this->getIdentifierType(),
        ];
    }

    public static function new(): self
    {
        return new self();
    }

    public function setMap(array $map): self
    {
        $this->map = $map;

        return $this;
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

    public function getEncodedMap(): string
    {
        $mapElementArray = [];

        foreach ($this->map as $key => $fields) {
            $mapElementArray[] = [
                'value' => $key,
                'fields' => $fields
            ];
        }

        return json_encode($mapElementArray, JSON_THROW_ON_ERROR);
    }
}
